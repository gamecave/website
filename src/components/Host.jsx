import React from 'react';
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.connect();

const handleClick = () => {
  socket.emit('host', {game: 'tanks'});
}

const Host = (props) => {
  console.warn(props)
  return (
    <div>
      <button onClick={handleClick}> Click to host </button>
    </div>
  );
}

export default Host;
