## Synopsis

Trivia Station is an open-source project featuring a trivia game and a database of questions that users may interact with. The app was built with the [React](https://facebook.github.io/react/) library. It communicates with an [Express](https://expressjs.com/) based API which loads and saves questions to [MongoDB](https://www.mongodb.org/).

The app can be seen in production at <https://trivia.nathanielwood.me>

Contributions to the project are welcome.

---

This repo combines both the client and server repos into submodules for an easier development environment.

You may use the following steps to set things up quickly without any configuration. Please note that MongoDB must installed and running on the system.

```sh
$ git clone --recursive https://github.com/nathanielwood/trivia-station.git
$ cd trivia-station
$ npm run prep-dev
$ npm start
```

The *prep-dev* script will run all the npm and bower installations and prepare a basic development configuration file for both the client and server. It will also seed the database with questions taken from [QuizBang.co.uk](http://www.quizbang.co.uk/cgi-bin/showQuiz.pl).
The *start* script will run the client app and server concurrently. The server API will run on **localhost:8080** while the client dev-server will run on **localhost:3000**.
