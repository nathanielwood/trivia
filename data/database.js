import Question from './models/Question';
import Game from './models/Game';

const validateQuestion = ({ text, answers }, cb) => {
  if (!text) return cb('Question text is required');
  if (!answers || !answers.length) return cb('An answer is required');
  // Test whether the answer array has at least one correct answer
  if (!answers.some(a => a.correct === true)) return cb('At least one answer needs to be correct');
  return cb();
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
  const rand = Math.floor(Math.random() * (question.incorrectAnswers.length + 1));
  let answers = question.incorrectAnswers.slice();
  answers = shuffleArray(answers);
  // assuming only one correct answer. This will need to change
  answers.splice(rand, 0, question.correctAnswers[0]);
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

const getQuestions = () => (
  new Promise((resolve, reject) => {
    Question.find({}, (err, res) => (
      err ? reject(err) : resolve(res)
    ));
  })
);

const getQuestionById = (id) => (
  new Promise((resolve, reject) => {
    Question.findById(id, (err, res) => (
      err ? reject(err) : resolve(res)
    ));
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

const addQuestion = ({ text, answers }) => (
  new Promise((resolve, reject) => {
    validateQuestion({ text, answers }, (error) => {
      if (error) return reject(error);
      const newQuestion = new Question({ text, answers });
      return newQuestion.save((err, res) => (
        err ? reject(err) : resolve(res)
      ));
    });
  })
);

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
};
