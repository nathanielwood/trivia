const questions = [
  {
    text: 'A banana is a type of what?',
    correct: 'Fruit',
    incorrect: ['Vegetable', 'Grain', 'Meat'],
  },
  {
    text: 'A fish lives where?',
    correct: 'In water',
    incorrect: ['On land', 'In the air', 'In space'],
  },
  {
    text: 'What is not a part of the body?',
    correct: 'Mitten',
    incorrect: ['Foot', 'Head', 'Arm'],
  },
];

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  const newArray = array.slice();

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

export const generateQuestion = () => {
  let rand = Math.floor(Math.random() * questions.length);
  const question = questions[rand];
  rand = Math.floor(Math.random() * (question.incorrect.length + 1));
  let answers = question.incorrect.slice();
  answers = shuffleArray(answers);
  answers.splice(rand, 0, question.correct);
  return {
    text: question.text,
    answers,
    correct: rand,
    answered: false,
    selected: null,
  };
};
