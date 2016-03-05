/* eslint no-console:0, dot-notation:0 */

import mongoose from 'mongoose';
import Question from '../data/models/Question';

mongoose.connect('mongodb://localhost/trivia');

const questions = [
  {
    text: 'A banana is a type of what?',
    correct: ['Fruit'],
    incorrect: ['Vegetable', 'Meat', 'Dairy'],
  },
  {
    text: 'A fish lives where?',
    correct: ['In water'],
    incorrect: ['On land', 'In the air', 'In space'],
  },
  {
    text: 'What is not part of the body?',
    correct: ['Mitten'],
    incorrect: ['Head', 'Foot', 'Arm'],
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
