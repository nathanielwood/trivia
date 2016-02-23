// import graphql from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';

mongoose.connect('mongodb://localhost/trivia');

// console.log('Server online!');
express()
  .use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }))
  .listen(3000);
