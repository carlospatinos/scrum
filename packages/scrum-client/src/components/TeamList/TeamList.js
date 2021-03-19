import React from 'react';
import { Card, Accordion, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GridGenerator from '../GridGenerator';
import './TeamList.css';
import { DECKS } from '../../constants';

const getUserVote = (storyVotes, user) => {
  const storyVote = storyVotes.find(([email]) => email === user.email);
  return storyVote ? storyVote[1] : '...';
};

const TeamList = props => {
  const { title, subtitle, users, storyVotes, sessionInformation } = props;
  const cardDeck = DECKS.byLabels(sessionInformation.cardDeck);

  const getMaxVote = () => {
    const maxVote = cardDeck.getMaxVote(storyVotes);
    if (maxVote > 0) {
      return maxVote;
    }
    return 0;
  };
  const getMinVote = () => {
    const minVote = cardDeck.getMinVote(storyVotes);
    if (minVote > 0) {
      return minVote;
    }
    return 0;
  };
  const getAvgVote = () => {
    const avgVote = cardDeck.getAvgVote(storyVotes);
    if (avgVote > 0) {
      return avgVote;
    }
    return 0;
  };

  const generateUserStatusBadge = () => {
    const randomStatus = Math.random();
    if (randomStatus > 0.5) {
      return <Badge variant="success">Online</Badge>;
    }
    return <Badge variant="danger">Offline</Badge>;
  };
  return (
    <Accordion defaultActiveKey="0">
      <Card className="text-center">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <b>{title}</b>
          <br />
          {subtitle}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <GridGenerator columns={2}>
              {users.map(user => {
                return (
                  <Card style={{ width: '12rem' }}>
                    <Card.Header>{user.fullName}</Card.Header>
                    <Card.Img variant="top" src="/icons/unknown.png" />
                    <Card.Body>
                      <Card.Title>{getUserVote(storyVotes, user)}</Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{generateUserStatusBadge()}</Card.Footer>
                  </Card>
                );
              })}
            </GridGenerator>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          Average [{getAvgVote()}] | Max [{getMaxVote()}] | Min [{getMinVote()}]
        </Card.Footer>
      </Card>
    </Accordion>
  );
};

TeamList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

TeamList.defaultProps = {
  subtitle: undefined,
  users: [],
};

export default TeamList;
