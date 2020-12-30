import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { useAuthState } from '../../context';
import './Profile.css';

export default function Profile() {
  const [shareLink, setShareLink] = useState('');
  const userDetails = useAuthState();
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

  return (
    <Container className="Login">
      <Form>
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
