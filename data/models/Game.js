import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('Game', GameSchema);

export default Game;
