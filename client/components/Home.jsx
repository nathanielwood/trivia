// client/components/Home.jsx

import React from 'react';
import SingleGameQuestion from './SingleGameQuestion';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Jumbotron,
  PageHeader,
  Grid,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

export default () => (
  <div>
    <Jumbotron>
      <PageHeader className="text-center">Trivia Station</PageHeader>
      <hr />
      <p>
        Trivia Station provides an open database of multiple choice trivia
         questions that you are free to use for any purpose.
      </p>
      <p>
        Please consider contributing your own trivia question to the database.
        You can also play a trivia game with a random selection of questions.
      </p>
      <Grid>
        <Row>
          <Col sm={4} style={{ margin: '10px 0px' }}>
            <LinkContainer to={{ pathname: '/game' }}>
              <Button bsSize="large" block>
                <i className="fa fa-trophy fa-3x"></i><br /><br />Play Game
              </Button>
            </LinkContainer>
            </Col>
          <Col sm={4} style={{ margin: '10px 0px' }}>
            <LinkContainer to={{ pathname: '/question' }}>
              <Button bsSize="large" block>
                <i className="fa fa-database fa-3x"></i><br /><br />View Database
              </Button>
            </LinkContainer>
          </Col>
          <Col sm={4} style={{ margin: '10px 0px' }}>
            <OverlayTrigger placement="top" overlay={
                <Tooltip id="coming-soon">Coming soon</Tooltip>
              }
            >
              <Button bsSize="large" block>
                <i className="fa fa-exchange fa-3x"></i><br /><br />Web API
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Grid>
    </Jumbotron>
    <SingleGameQuestion />
  </div>
);
