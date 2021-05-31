import React from 'react';
import { Badge, Row, Col, Figure } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './TeamList.css';

const getUserVote = (storyVotes, user) => {
  console.log('storyVotes', storyVotes);
  // eslint-disable-next-line
  console.log('user._id', user._id);
  // eslint-disable-next-line
  const storyVote = storyVotes.find(([id]) => {
    console.log('id', id);
    // eslint-disable-next-line
    return id === user._id;
  });
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
    <>
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <strong>
            {title} {subtitle}
          </strong>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="d-flex justify-content-center">
          <Figure className="d-none d-sm-none d-md-block">
            <Figure.Image width={680} alt="Chart" src="/dashboard.png" />
            <Figure.Caption>Important chart about session behaviour</Figure.Caption>
          </Figure>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={4} lg={2}>
          Average [{summaryVotes.avgVote}]
        </Col>
        <Col xs={6} md={4} lg={2}>
          Max [{summaryVotes.maxVote}]
        </Col>
        <Col xs={6} md={4} lg={2}>
          Min [{summaryVotes.minVote}]
        </Col>
        <Col xs={6} md={4} lg={2}>
          Question [{summaryVotes.question}]
        </Col>
        <Col xs={6} md={4} lg={2}>
          Infinity [{summaryVotes.infinity}]
        </Col>
        <Col xs={6} md={4} lg={2}>
          Coffee [{summaryVotes.coffee}]
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        {/* eslint-disable */}
        {users.filter(user => user._id !== admin.id)
          .map(user => {
            return (
              <Col className="box" xs={12} md={6}>
                <div className="bg-light inner">
                  <Row>
                    <Col>
                      <Figure className="my-auto">
                        <Figure.Image
                          roundedCircle
                          width={50}
                          height={50}
                          alt="171x180"
                          src="/icons/voting-face.png"
                        />
                        {generateUserStatusBadge()}
                      </Figure>
                    </Col>
                    <Col className="my-auto">{user.firstName} {user.lastName}</Col>
                    <Col className="my-auto">% acc</Col>
                    <Col className="my-auto">{getUserVote(storyVotes, user)}</Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        { /* eslint-enable */}



      </Row>
    </>
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
