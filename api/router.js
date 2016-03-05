import express from 'express';
import {
  getQuestions,
  getQuestionById,
  addQuestion,
  getGames,
  addGame,
  getGameById,
  getGameQuestionById,
  answerGameQuestion,
  nextGameQuestion,
} from '../data/database';
// import Question from '../data/models/Question';

// Routes for the API
const router = new express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log('Middleware'); // eslint-disable-line
  next();
});

router.route('/questions')
.post(addQuestion)
.get(getQuestions);

router.route('/questions/:question_id')
.get(getQuestionById);
// .put((req, res) => {
//   Question.findById(req.params.question_id, (err, question) => {
//     if (err) res.send(err);
//     const updateQuestion = question;
//     updateQuestion.text = req.body.text;
//     updateQuestion.save((err2) => {
//       if (err2) res.send(err2);
//       res.json({ message: 'Question updated!' });
//     });
//   });
// })
// .delete((req, res) => {
//   Question.remove({ _id: req.params.question_id }, (err) => {
//     if (err) res.send(err);
//     res.json({ message: 'Successfully deleted' });
//   });
// });

router.route('/games')
.get(getGames)
.post(addGame);

router.route('/games/:game_id')
.get(getGameById);

router.route('/games/:game_id/next')
.get(nextGameQuestion);

router.route('/games/:game_id/:question_id')
.get(getGameQuestionById)
.post(answerGameQuestion);

// test route to make sure everything is working
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Trivia API' });
});

export default router;
