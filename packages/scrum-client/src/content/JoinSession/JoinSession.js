import React from 'react';
import QRCode from 'qrcode.react';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function JoinSession() {
  const sessionToJoin = `${API_BASE_URL}/session123`;

  return (
    <div className="NotFound">
      <h3>Invite members</h3>
      <p>
        Please share the following link with the members joining the session or if you are sharing
        the screen let them see the QR so they can join automatticaly
      </p>
      <QRCode value={sessionToJoin} />
      <br />
      <a href={sessionToJoin}>{sessionToJoin}</a>
    </div>
  );
}
