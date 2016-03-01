import Question from './models/Question';
import Game from './models/Game';

const validateQuestion = ({ text, answers }, cb) => {
  if (!text) return cb('Question text is required');
  if (!answers || !answers.length) return cb('An answer is required');
  // Test whether the answer array has at least one correct answer
  if (!answers.some(a => a.correct === true)) return cb('At least one answer needs to be correct');
  return cb();
};

const getGames = () => (
  new Promise((resolve, reject) => {
    Game.find({}, (err, res) => (
      err ? reject(err) : resolve(res)
    ));
  })
);

const getGameById = (id) => (
  new Promise((resolve, reject) => {
    Game.findById(id, (err, res) => (
      err ? reject(err) : resolve(res)
    ));
  })
);

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

const addGame = () => (
  new Promise((resolve, reject) => {
    const newGame = new Game();
    Question.find({}, (error, response) => {
      if (error) return reject(error);
      const questions = response.map(question => question._id);
      newGame.push({ questions });
      newGame.save((err, res) => (
        err ? reject(err) : resolve(res)
      ));
    });
  })
);

const addQuestion = ({ text, answers }) => (
  new Promise((resolve, reject) => {
    validateQuestion({ text, answers }, (error) => {
      if (error) return reject(error);
      const newQuestion = new Question({ text, answers });
      newQuestion.save((err, res) => (
        err ? reject(err) : resolve(res)
      ));
    });
  })
);

export {
  getGames,
  getGameById,
  getQuestions,
  getQuestionById,
  addGame,
  addQuestion,
};
