/* eslint-disable */
// TODO is this really neded? Otherwise remove
let user;

const newItem = content => {
  const item = document.createElement('li');
  item.innerText = content;
  return item;
};

const socket = io();

socket.on('connect', () => {
  $events = document.getElementById('events');
  // $events.appendChild(newItem('user connected'));
});

function setUsername(email) {
  console.log(`set username: ${email}`);
  socket.emit('newOnlineUser', email);
}

socket.on('userExists', data => {
  document.getElementById('error-container').innerHTML = data;
});

socket.on('onlineUser', data => {
  console.log(`new user online: ${JSON.stringify(data)}`);
  const events = document.getElementById('events');
  if (events) {
    events.appendChild(newItem(`${JSON.stringify(data)}`));
  }
});

socket.on('userSet', data => {
  user = data.username;
  document.body.innerHTML =
    '<input type = "text" id = "message">\
     <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
     <div id = "message-container"></div>\
     <ul id="events"></ul>';
});

function sendMessage() {
  console.log('send message');
  const msg = document.getElementById('message').value;
  if (msg) {
    socket.emit('newMsg', { message: msg, user });
    socket.broadcast.emit('newMsg', 'hello friends!');
  }
}
socket.on('newMsg', data => {
  console.log(`new message${data}`);
  if (user) {
    document.getElementById(
      'message-container'
    ).innerHTML += `<div><b>${data.user}</b>: ${data.message}</div>`;
  }
});

socket.on('newCliientJoined', userInfo => {
  $events = document.getElementById('events');
  const jsonUserInfo = JSON.stringify(userInfo);
  $events.appendChild(newItem(`New user joined: ${jsonUserInfo}`));
});
