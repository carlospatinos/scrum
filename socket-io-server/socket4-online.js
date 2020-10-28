// const port = process.env.PORT || 4001;//3000
const port = process.env.PORT || 3000;//3000

const content = require('fs').readFileSync(__dirname + '/socket4-online.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer);

var users = [];

io.on('connect', socket => {
  console.log("user connected: " + socket.id);
  io.emit('newCliientJoined', { user_id: socket.id });

  // let counter = 0;
  // setInterval(() => {
  //   socket.emit('hello', ++counter);
  // }, 1000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('setUsername', function (data) {
    console.log("user: " + data);
    if (users.indexOf(data) == -1) {
      console.log('new user added ' + data);
      users.push(data);
      socket.emit('userSet', { username: data });
    } else {
      socket.emit('userExists', data + ' username is taken! Try some other username.');
    }
  });

  socket.on('newMsg', function (data) {
    console.log("newMsg: " + JSON.stringify(data));
    socket.emit('newMsg', data);
  });


});

httpServer.listen(port, () => {
  console.log('go to http://localhost:3000');
});


