const SocketState = (initialState=[]) => {
    const rooms = new Map(...initialState);
    console.log('--server--state-SocketState');
    
    const addRoom = (room) => {
        if(!rooms.has(room.id)){
            rooms.set(room.id, {id:room.id, users:new Map()});
        }
        return rooms.get(room.id);
    };

    const addUserToRoom = (room, user) => {
        addRoom(room)
        return rooms.get(room.id);
    };

    const joinUserToRoom = (room, user) => {
      // console.log('--server--state-joinUserToRoom',room,user);
      if(rooms.has(room.id)){
        const _room = rooms.get(room.id);
        if(!_room.users.has(user.email)){
          _room.users.set(user.email, user);
        }
      }else{
        const users = new Map();
        users.set(user.email, user);
        rooms.set(room.id, {id: room.id, users});
      }
    };

    const getRoom = (room) => {
      // console.log('--server--state-getRoom',room, rooms); 
      return rooms.get(room.id);
  };
  
    return { getRoom, joinUserToRoom };
  };
  
  module.exports = { SocketState };