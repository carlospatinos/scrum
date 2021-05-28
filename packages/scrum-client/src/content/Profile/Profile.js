import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Card, Modal } from 'react-bootstrap';
import { useAuthState, useAuthDispatch, logout } from '../../context';
import { ProfileAPI } from '../../api';

import './Profile.css';

export default function Profile() {
  const [shareLink, setShareLink] = useState('');
  const [showModal, setShowModal] = useState(false);

  const modalClose = () => setShowModal(false);
  const modalShow = async event => {
    event.preventDefault();
    setShowModal(true);
  };
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
    console.log('userDetails', userDetails);
    generateReferralLink(userDetails);
  }, [userDetails]);

  const handleDeleteProfile = async event => {
    event.preventDefault();
    try {
      ProfileAPI.remove(userDetails).then(response => {
        if (response) {
          logout(dispatch);
        } else {
          // TODO what to do?
          // console.log('profile not deleted?');
        }
      });
    } catch (e) {
      // console.log('error', e);
    }
  };

  return (
    <Container>
      <Modal show={showModal} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This operation is final and unreversible, chose wisely!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Delete
          </Button>
          <Button variant="primary" onClick={modalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Form onSubmit={modalShow}>
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
