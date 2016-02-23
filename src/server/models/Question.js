import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: String,
  answers: [{
    value: String,
    correct: Boolean,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});
const Question = mongoose.model('Question', QuestionSchema);

export default Question;
