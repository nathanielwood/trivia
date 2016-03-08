import _ from 'lodash';
import Question from './models/Question';
import Game from './models/Game';
import { validateQuestionForm } from '../client/utilities/validations';

// cleans array of empty strings, null or undefined variables
const cleanArray = (array) => {
  if (array.constructor !== Array) return [array];
  return array.filter((v) => v === 0 || v);
};

const shuffleArray = (array) => {
  let currentIndex = array.length;
  const newArray = array.slice();

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

const generateQuestion = (question) => {
  const rand = Math.floor(Math.random() * (question.incorrect.length + 1));
  let answers = question.incorrect.slice();
  answers = shuffleArray(answers);
  // assuming only one correct answer. This will need to change
  answers.splice(rand, 0, question.correct[0]);
  return {
    text: question.text,
    answers,
    correct: rand,
    answered: false,
  };
};

const getGames = (req, res) => (
  Game.find({}, (err, games) => {
    if (err) return res.send(err);
    return res.json(games);
  })
);

const getGameById = (req, res) => {
  Game.findById(req.params.game_id, (err, game) => {
    if (err) return res.send(err);
    if (!game) return res.json({ message: 'Game not found' });
    return res.json(game);
  });
};

const getGameQuestionById = (req, res) => {
  Game.findById(req.params.game_id)
  .select('+questions.correct')
  .exec((err, game) => {
    if (err) return res.send(err);
    if (!game) return res.json({ message: 'Game not found' });
    const returnQuestion = game.questions.id(req.params.question_id);
    if (!returnQuestion) return res.json({ message: 'Question not found' });
    if (!returnQuestion.answered) returnQuestion.correct = undefined;
    return res.json(returnQuestion);
  });
};

const getQuestions = (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  return Question.paginate({}, {
    select: 'updatedAt text correct incorrect',
    sort: { updatedAt: -1 },
    lean: true,
    page,
    limit,
  }, (err, questions) => {
    if (err) return res.send(err);
    return res.json(questions);
  });
};

const getQuestionById = (req, res) => (
  Question.findById(req.params.question_id, (err, question) => {
    if (err) return res.send(err);
    if (!question) return res.json({ message: 'Question not found' });
    return res.json(question);
  })
);

const addGame = (req, res) => {
  let limit = req.body.limit;
  if (!limit || (typeof limit !== 'number')) limit = 3;
  Question.findRandom({}, {}, { limit }, (err, questions) => {
    if (err) return res.send(err);
    const game = new Game({
      points: 0,
      questionCursor: 0,
    });
    const shuffledQuestions = shuffleArray(questions);
    game.questions = shuffledQuestions.map((question) => (
      generateQuestion(question)
    ));
    return game.save((err2, game2) => {
      if (err2) return res.send(err2);
      return res.json({
        _id: game2._id,
      });
    });
  });
};

const answerGameQuestion = (req, res) => {
  if (!req.body.selected) return res.json({ message: 'Answer is required' });
  const selected = parseInt(req.body.selected, 10);
  return Game.findById(req.params.game_id)
  .select('+questions.correct')
  .exec((err, game) => {
    if (err) return res.send(err);
    if (!game) return res.json({ message: 'Game not found' });
    let updatePoints = game.points;
    const updateQuestion = game.questions.id(req.params.question_id);
    if (!updateQuestion) return res.json({ message: 'Question not found' });
    if (updateQuestion.answered) {
      return res.json({ message: 'Question is already answered' });
    }
    updateQuestion.answered = true;
    updateQuestion.selected = selected;
    if (updateQuestion.selected === updateQuestion.correct) {
      updateQuestion.answeredCorrect = true;
      updatePoints++;
    } else {
      updateQuestion.answeredCorrect = false;
    }
    return Game.findOneAndUpdate({
      _id: req.params.game_id,
      'questions._id': req.params.question_id,
    }, {
      $set: {
        points: updatePoints,
        'questions.$': updateQuestion,
      },
    }, {
      new: true,
    })
    .select('+questions.correct')
    .exec((err2, game2) => {
      if (err2) return res.send(err);
      return res.json(game2);
    });
  });
};

const nextGameQuestion = (req, res) => (
  Game.findById(req.params.game_id, (err, game) => {
    if (err) return res.send(err);
    if (!game) return res.json({ message: 'Game not found' });
    if (game.finished) return res.json(game);
    if (!game.questions[game.questionCursor].answered) {
      return res.json({ message: 'Question has not been answered' });
    }
    const updateGame = game;
    if (updateGame.questionCursor + 1 >= updateGame.questions.length) {
      updateGame.finished = true;
    } else {
      updateGame.questionCursor++;
    }
    return updateGame.save((err2, game2) => {
      if (err2) return res.send(err2);
      return res.json(game2);
    });
  })
);

const processQuestion = (values) => {
  const body = {
    text: values.text,
    correct: values.correct,
    incorrect: values.incorrect,
  };
  const errors = validateQuestionForm(body);
  if (!_.isEmpty(errors)) return { errors };
  body.correct = cleanArray(body.correct);
  body.incorrect = cleanArray(body.incorrect);
  return body;
};

const addQuestion = (req, res) => {
  const body = processQuestion(req.body);
  if (body.errors) return res.json({ errors: body.errors });
  const question = new Question(body);
  return question.save((err, question2) => {
    if (err) return res.send(err);
    return res.json(question2);
  });
};

const editQuestion = (req, res) => {
  const body = processQuestion(req.body);
  if (body.errors) return res.json({ errors: body.errors });
  return Question.findByIdAndUpdate(
    req.params.question_id,
    body,
    { new: true },
    (err, question) => {
      if (err) return res.send(err);
      if (!question) return res.json({ message: 'Question not found' });
      return res.json(question);
    }
  );
};

const removeQuestion = (req, res) => {
  Question.remove({ _id: req.params.question_id }, (err) => {
    if (err) res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
};

export {
  getGames,
  getGameById,
  getGameQuestionById,
  getQuestions,
  getQuestionById,
  addGame,
  answerGameQuestion,
  nextGameQuestion,
  addQuestion,
  editQuestion,
  removeQuestion,
};
