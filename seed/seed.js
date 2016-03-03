/* eslint no-console:0, dot-notation:0 */

import mongoose from 'mongoose';
import Question from '../data/models/Question';

mongoose.connect('mongodb://localhost/trivia');

const questions = [
  {
    text: 'A banana is a type of what?',
    correctAnswers: ['Fruit'],
    incorrectAnswers: ['Vegetable', 'Meat', 'Dairy'],
  },
  {
    text: 'A fish lives where?',
    correctAnswers: ['In water'],
    incorrectAnswers: ['On land', 'In the air', 'In space'],
  },
  {
    text: 'What is not part of the body?',
    correctAnswers: ['Mitten'],
    incorrectAnswers: ['Head', 'Foot', 'Arm'],
  },
];

mongoose.connection.collections['questions'].drop(() => {
  Question.create(questions, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Seed data created.');
    }
    process.exit();
  });
});
