import React from 'react';
import { Card, Accordion, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GridGenerator from '../GridGenerator';
import './TeamList.css';

const getUserVote = (storyVotes, user) => {
  const storyVote = storyVotes.find(([id]) => id === user.id);
  return storyVote ? storyVote[1] : '...';
};

const TeamList = props => {
  const { title, subtitle, users, storyVotes, admin, summaryVotes } = props;

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
              {users
                .filter(user => user.id !== admin.id)
                .map(user => {
                  return (
                    <Card style={{ width: '12rem' }}>
                      <Card.Img variant="top" src="/icons/unknown.png" />
                      <Card.Body>
                        <Card.Title>{getUserVote(storyVotes, user)}</Card.Title>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        {user.fullName}
                        <br /> {generateUserStatusBadge()}
                      </Card.Footer>
                    </Card>
                  );
                })}
            </GridGenerator>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          Average [{summaryVotes.avgVote}] | Max [{summaryVotes.maxVote}] | Min [
          {summaryVotes.minVote}] | Question [{summaryVotes.question}] | Infinity [
          {summaryVotes.infinity}] | Coffee [{summaryVotes.coffee}]
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
      id: PropTypes.string,
    })
  ),
  admin: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
};

TeamList.defaultProps = {
  subtitle: undefined,
  users: [],
  admin: { id: undefined },
};

export default TeamList;
