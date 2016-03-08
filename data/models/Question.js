import mongoose from 'mongoose';
import random from 'mongoose-simple-random';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: {
    type: String,
  },
  correct: {
    type: [String],
  },
  incorrect: {
    type: [String],
  },
}, { timestamps: true });
QuestionSchema.plugin(random);
QuestionSchema.plugin(mongoosePaginate);

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
