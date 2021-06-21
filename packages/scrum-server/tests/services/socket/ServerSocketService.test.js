/* eslint-disable jest/valid-expect */
import { expect } from 'chai';
import sinon from 'sinon';
import { EVENT } from 'scrum-common';
import ServerSocketService from '../../../src/services/socket/ServerSocketService';

const socketIo = require('socket.io');

let server;

describe('ServerSocketService', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create();
  });
  afterEach(() => {
    server.restore();
  });

  it('initialize the server socket service and invokes sockets io', () => {
    console.log('socketIo', socketIo);
    const onSpy = sinon.spy(socketIo.prototype, 'on');
    const serverSocketService = new ServerSocketService(server);

    //  Test get instance returns the same instance
    expect(serverSocketService).to.eql(serverSocketService.getInstance());

    // Verify  socket io is connected
    onSpy.restore();
    sinon.assert.calledOnce(onSpy);
    sinon.assert.calledWithMatch(onSpy, EVENT.CONNECTION);
  });
});
