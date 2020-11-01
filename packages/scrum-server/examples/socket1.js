/* eslint-disable */
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const userSocketIdMap = new Map();

function addClientToMap(userName, socketId) {
  if (!userSocketIdMap.has(userName)) {
    // when user is joining first time
    userSocketIdMap.set(userName, new Set([socketId]));
  } else {
    // user had already joined from one client and now joining using another client
    userSocketIdMap.get(userName).add(socketId);
  }
}

function removeClientFromMap(userName, socketId) {
  if (userSocketIdMap.has(userName)) {
    const userSocketIdSet = userSocketIdMap.get(userName);
    userSocketIdSet.delete(socketID);
    // if there are no clients for a user, remove that user from online list(map)
    if (userSocketIdSet.size == 0) {
      userSocketIdMap.delete(userName);
    }
  }
}

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    // let recipientSocketIds = userSocketIdMap.get(recipientUserName);
    // for (let socketId of recipientSocketIds) {
    //     io.to(socketID).emit('chat message', messageContent);
    // }
    console.log(`message: ${msg}`);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
