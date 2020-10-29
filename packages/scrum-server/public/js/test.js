var socket = io();

const newItem = (content) => {
    const item = document.createElement('li');
    item.innerText = content;
    return item;
};

socket.on('connect', () => {
    $events = document.getElementById('events');
    $events.appendChild(newItem('connect'));
});