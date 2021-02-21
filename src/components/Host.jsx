import React, { useEffect } from 'react';
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });




const Host = (props) => {
  let session_id = props.match.params.session_id
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.connect();
    console.warn(props)
    socket.emit('host', {session_id: session_id, starting_input: 'wasds'});
  }, []);

  console.warn(props)
  return (
    <div>
      <button> Click to host </button>
    </div>
  );
}

export default Host;
