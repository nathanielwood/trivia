/* eslint no-console:0, dot-notation:0 */

import mongoose from 'mongoose';
import Question from '../src/server/models/Question';

mongoose.connect('mongodb://localhost/trivia');

const questions = [
  {
    text: 'A banana is a type of what?',
    answers: [
      {
        value: 'Fruit',
        correct: true,
      },
      {
        value: 'Vegetable',
        correct: false,
      },
      {
        value: 'Meat',
        correct: false,
      },
      {
        value: 'Dairy',
        correct: false,
      },
    ],
  },
  {
    text: 'A fish lives where?',
    answers: [
      {
        value: 'In water',
        correct: true,
      },
      {
        value: 'On land',
        correct: false,
      },
      {
        value: 'In the air',
        correct: false,
      },
      {
        value: 'In space',
        correct: false,
      },
    ],
  },
  {
    text: 'What is not part of the body?',
    answers: [
      {
        value: 'Mitten',
        correct: true,
      },
      {
        value: 'Head',
        correct: false,
      },
      {
        value: 'Foot',
        correct: false,
      },
      {
        value: 'Arm',
        correct: false,
      },
    ],
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
