/* eslint-disable */

const content = require('fs').readFileSync(`${__dirname}/socket3.html`, 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer);

io.on('connect', socket => {
  console.log('user connected');

  // either with send()
  socket.send('Hello!');

  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { ms: 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('message', data => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});
