import React from 'react';
import { ListGroup, Card, Accordion, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GridGenerator from '../GridGenerator';
import './TeamList.css';

const getUserVote = (storyVotes, user) => {
  const storyVote = storyVotes.find(([email]) => email === user.email);
  return storyVote ? storyVote[1] : '...';
};

const TeamList = props => {
  const { title, subtitle, users, storyVotes } = props;
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
                    <Card.Footer className="text-muted">Online | Offline</Card.Footer>
                  </Card>
                );
              })}
            </GridGenerator>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>Average [5] | Max [5] | Min [5]</Card.Footer>
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
