import express from 'express';
import { urlencoded, json } from 'body-parser';
import mongoose from 'mongoose';
import router from './router';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/trivia');

const API_PORT = 8080;

const api = express();
api.use(urlencoded({ extended: true }));
api.use(json());

// Register the Routes
api.use('/api', router);

// Start API server
api.listen(API_PORT, () => {
  console.log(`API Server is now listening on port ${API_PORT}`); // eslint-disable-line
});
