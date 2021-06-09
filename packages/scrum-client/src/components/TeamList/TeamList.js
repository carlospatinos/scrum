import React from 'react';
import { Badge, Row, Col, Figure } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Label } from 'recharts';
import PropTypes from 'prop-types';
import './TeamList.css';

const data = [
  {
    name: 'S',
    numberOfVotes: 2,
    voters: 'Carlos, Pedro, Luis',
  },
  {
    name: 'M',
    numberOfVotes: 5,
    voters: 'Carlos, Miguel',
  },
  {
    name: 'L',
    numberOfVotes: 3,
    voters: 'Jose, Juan',
  },
  {
    name: 'XL',
    numberOfVotes: 1,
    voters: 'El chavito seguia bailando',
  },
  {
    name: 'XS',
    numberOfVotes: 2,
    voters: 'A, B, C',
  },
];
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="desc" />
//       </div>
//     );
//   }

//   return null;
// };

const getUserVote = (storyVotes, user) => {
  // eslint-disable-next-line
  const storyVote = storyVotes.find(([id]) => id === user._id);
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
        <Col sm={8} className="d-flex justify-content-center">
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label value="Pages of my website" offset={0} position="insideBottom" />
            </XAxis>
            <Tooltip />
            <YAxis label={{ value: '# of votes', angle: -90, position: 'insideLeft' }} />
            <Bar dataKey="numberOfVotes" fill="#8884d8" background={{ fill: '#eee' }}>
              {' '}
              <LabelList dataKey="voters" position="top" />
            </Bar>
          </BarChart>
        </Col>
        <Col sm={4}>
          <Row>
            <Col>Fastest responder: Luis</Col>
          </Row>
          <Row>
            <Col>Most accurate responder so far: Luis</Col>
          </Row>
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
