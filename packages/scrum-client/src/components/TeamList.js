import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const getUserVote = (storyVotes, user) => {
  const storyVote = storyVotes.find(([email]) => email === user.email);
  return storyVote ? storyVote[1] : '...';
};

const TeamList = props => {
  const { title, subtitle, users, storyVotes } = props;
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
      <ListGroup variant="flush">
        {users.map(user => (
          <ListGroup.Item key={user.fullName}>
            {user.fullName} - {getUserVote(storyVotes, user)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
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
