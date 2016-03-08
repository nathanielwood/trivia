/* eslint no-console:0, dot-notation:0 */

import mongoose from 'mongoose';
import fetch from 'isomorphic-fetch';
import { XmlEntities } from 'html-entities';
import Question from '../data/models/Question';

const NUM_QUESTIONS = 10000;

// The data fetched is all escaped, so it is passed through the following
// decode function
const entities = new XmlEntities();
const decode = entities.decode;

mongoose.connect('mongodb://localhost/trivia');

console.log('Fetching questions...');
fetch(`http://www.quizbang.co.uk/cgi-bin/fetch.pl?command=questions&num=${NUM_QUESTIONS}&format=json`)
.then(response => response.json())
.then(json => {
  if (!json.response) {
    return console.log('Error retrieving data');
  }
  console.log(json.response.text);
  if (json.response.status !== '0') {
    return console.log('Aborting - incorrect status');
  }
  return json.questions.map((question) => ({
    text: decode(question.text),
    correct: [decode(question.answers.shift().text)],
    incorrect: question.answers.map(answer => decode(answer.text)),
  }));
})
.then((questions) => (
  mongoose.connection.collections['questions'].drop(() => {
    Question.create(questions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Seed data created, ${questions.length} questions added to database`);
      }
      process.exit();
    });
  })
));

// const questions = [
//   {
//     text: 'A banana is a type of what?',
//     correct: ['Fruit'],
//     incorrect: ['Vegetable', 'Meat', 'Dairy'],
//   },
//   {
//     text: 'A fish lives where?',
//     correct: ['In water'],
//     incorrect: ['On land', 'In the air', 'In space'],
//   },
//   {
//     text: 'What is not part of the body?',
//     correct: ['Mitten'],
//     incorrect: ['Head', 'Foot', 'Arm'],
//   },
// ];

// mongoose.connection.collections['questions'].drop(() => {
//   Question.create(questions, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Seed data created.');
//     }
//     process.exit();
//   });
// });
