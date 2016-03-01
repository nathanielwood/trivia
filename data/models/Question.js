import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: {
    type: String,
  },
  correctAnswers: {
    type: [String],
  },
  incorrectAnswers: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
