import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Row, Col, Figure, Jumbotron } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthState, useAuthDispatch, logout } from '../../context';
import { ProfileAPI, PlanningSessionAPI } from '../../api';

import './Profile.css';

export default function Profile() {
  const [shareLink, setShareLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [numberOfSessions, setNumberOfSessions] = useState();
  const { t } = useTranslation();

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
    // eslint-disable-next-line no-underscore-dangle
    setShareLink(`${url}/signup/${userInfo.user._id}`);
  }

  useEffect(() => {
    generateReferralLink(userDetails);
    // eslint-disable-next-line no-underscore-dangle
    PlanningSessionAPI.getByAdminId(userDetails.user._id).then(res => {
      setNumberOfSessions(res.length);
    });
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
          <Modal.Title>{t('ProfileView.mdlTtlDeleteProfile')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('ProfileView.mdlMsgDeleteProfile')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteProfile}>
            {t('ProfileView.mdlBtnYesDeleteProfile')}
          </Button>
          <Button variant="primary" onClick={modalClose}>
            {t('ProfileView.mdlBtnNoDeleteProfile')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col xs={0} md={2} lg={3} className="mx-auto" />
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Jumbotron className="mt-3 shadow-lg p-3 mb-5 bg-white rounded">
            <Form onSubmit={modalShow}>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Figure variant="top">
                    <Figure.Image
                      roundedCircle
                      width={150}
                      height={150}
                      alt="User Profile Pic"
                      src={image}
                    />
                  </Figure>
                </Col>
              </Row>
              <Row>
                <Col md={5}>{t('ProfileView.lblUserName')}</Col>
                <Col md={7}>
                  {userDetails.user.firstName} {userDetails.user.lastName}
                </Col>
              </Row>
              <Row>
                <Col md={5}>{t('ProfileView.lblEmail')}</Col>
                <Col md={7}>{userDetails.user.email}</Col>
              </Row>
              <Row>
                <Col md={5}>Number of sessions: </Col>
                <Col md={7}>{numberOfSessions}</Col>
              </Row>
              <Row>
                <Col md={12}>{t('ProfileView.lblReferLinkTitle')}</Col>
                <Col md={12}>{shareLink}</Col>
              </Row>
              <br />

              <Row>
                <Col md={12}>
                  <Button block variant="danger" type="submit">
                    Delete
                  </Button>
                </Col>
              </Row>
            </Form>
          </Jumbotron>
        </Col>
        <Col xs={0} md={2} lg={3} className="mx-auto" />
      </Row>
    </Container>
  );
}
