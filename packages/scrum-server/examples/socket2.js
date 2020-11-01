/* eslint-disable */

app = require('express.io')();

app.http().io();

// Setup the ready route, join room and broadcast to room.
app.io.route('ready', req => {
  console.log(`Client on ready ${req.data}`);
  req.io.join(req.data);
  req.io.room(req.data).broadcast('announce', {
    message: `New client in the ${req.data} room. `,
  });
});

app.io.on('connection', socket => {
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

// Send the client html.
app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/socket2.html`);
});

app.listen(3000);
