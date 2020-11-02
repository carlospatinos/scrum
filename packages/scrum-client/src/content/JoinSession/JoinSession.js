import React from 'react';
import QRCode from 'qrcode.react';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function JoinSession() {
  const sessionToJoin = `${API_BASE_URL}/session123`;

  return (
    <div className="NotFound">
      <h3>Join the session</h3>
      <QRCode value={sessionToJoin} />
      <br />
      {sessionToJoin}
    </div>
  );
}
