import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import { useAuthState, useAuthDispatch, logout } from '../../context';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

import './Profile.css';

export default function Profile() {
  const [shareLink, setShareLink] = useState('');
  const userDetails = useAuthState();
  const dispatch = useAuthDispatch();

  const image =
    userDetails.user.profileImageUrl === undefined
      ? '/icons/default-profile.png'
      : userDetails.user.profileImageUrl;

  function generateReferralLink(userInfo) {
    const url = window.location.href.split('/').slice(0, 3).join('/');
    setShareLink(`${url}/signup/${userInfo.user.id}`);
  }

  useEffect(() => {
    generateReferralLink(userDetails);
  }, [userDetails]);

  const deleteProfile = async event => {
    event.preventDefault();
    try {
      Request.post(
        `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.DELETE_PROFILE}`,
        userDetails
      ).then(response => {
        if (response) {
          logout(dispatch);
        } else {
          // TODO what to do?
          console.log('profile not deleted?');
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <Container className="Login">
      <Form onSubmit={deleteProfile}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>User: {userDetails.user.fullName}</Card.Title>
            <Card.Text>
              Email: {userDetails.user.email} <br />
              Share the love: <br /> {shareLink}
            </Card.Text>
            <Button block variant="danger" type="submit">
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}
