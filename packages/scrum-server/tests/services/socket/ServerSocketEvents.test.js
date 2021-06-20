/* eslint-disable jest/valid-expect */
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { EVENT } from 'scrum-common';
import ServerSocketEvents from '../../../src/services/socket/ServerSocketEvents';

describe('ServerSocketEvents', () => {
  let fakeTo;
  let io;
  let serverSocketEvents;
  const socket = { join: sinon.fake() };
  const room = { id: 'id' };
  const user = { _id: 'user01', firstName: 'firstName', lastName: 'lastName', email: 'email' };
  const juan = { _id: 'user02', firstName: 'juan', lastName: 'lopez', email: 'email' };
  beforeEach(() => {
    fakeTo = { emit: sinon.fake() };
    io = { to: sinon.fake.returns(fakeTo) };
    serverSocketEvents = ServerSocketEvents(io)(socket);
  });

  it('joins a person to a room and emits the message with the new user', () => {
    const expectedUsers = [user];
    serverSocketEvents.onJoinUserToRoom({ room, user });

    assert(socket.join.calledWithExactly(room.id));
    assert(fakeTo.emit.called);
    assert(fakeTo.emit.calledWithExactly(EVENT.USER_JOINED, { room, users: expectedUsers }));
  });
  it('joins a person to a room and emits the message with all users in the room', () => {
    const expectedUsers = [user, juan];

    serverSocketEvents.onJoinUserToRoom({ room, user });

    assert(socket.join.calledWithExactly(room.id));
    assert(fakeTo.emit.getCall(0).calledWithExactly(EVENT.USER_JOINED, { room, users: [user] }));

    serverSocketEvents.onJoinUserToRoom({ room, user: juan });
    expect(fakeTo.emit.getCall(1).lastArg.users).to.eql(expectedUsers);
  });

  it('sends a message to a room', () => {
    // Given one user in the room
    const expectedMessageObj = { message: 'Hello', room };
    serverSocketEvents.onJoinUserToRoom({ room, user });

    //  Test sending a message to a room
    serverSocketEvents.onSendMessageToRoom({ room, message: expectedMessageObj.message });

    // Verify the message is sent
    expect(fakeTo.emit.getCall(1).args[0]).to.eql(EVENT.SEND_MESSAGE);
    expect(fakeTo.emit.getCall(1).args[1].message).to.eql(expectedMessageObj.message);
    expect(fakeTo.emit.getCall(1).args[1].room.id).to.eql(expectedMessageObj.room.id);
  });

  it('updates the current story of the room', () => {
    // Given one user in the room
    const expectedMessageObj = { story: { storyTitle: 'title' }, room };
    serverSocketEvents.onJoinUserToRoom({ room, user });

    //  Test updating the story
    serverSocketEvents.onStoryUpdate({ room, story: expectedMessageObj.story });

    // Verify the story is updated
    expect(fakeTo.emit.getCall(1).args[0]).to.eql(EVENT.STORY_UPDATE);
    expect(fakeTo.emit.getCall(1).args[1].story.storyTitle).to.eql(
      expectedMessageObj.story.storyTitle
    );
    expect(fakeTo.emit.getCall(1).args[1].room.id).to.eql(expectedMessageObj.room.id);
  });

  it('updates the votes given to the story', () => {
    // Given one user in the room
    // eslint-disable-next-line no-underscore-dangle
    const expectedMessageObj = { room, user, vote: '2', storyVotes: [[user._id, '2']] };
    serverSocketEvents.onJoinUserToRoom({ room, user });

    //  Test updating the story
    serverSocketEvents.onStoryVotesUpdate(expectedMessageObj);

    // Verify  the votes are updated
    expect(fakeTo.emit.getCall(1).args[0]).to.eql(EVENT.STORY_VOTES_UPDATE);
    expect(fakeTo.emit.getCall(1).args[1].storyVotes).to.eql(expectedMessageObj.storyVotes);
    expect(fakeTo.emit.getCall(1).args[1].room.id).to.eql(expectedMessageObj.room.id);
  });
});
