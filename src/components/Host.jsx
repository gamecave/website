import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });




const Host = (props) => {
  const [user_input, setUserInput] = useState({});
  let session_id = props.match.params.session_id
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on('create-player', (id) => {
      setUserInput(...user_input, {[id]: {}})
    })
    socket.on('send-input', (input, id) => {
      
      if (!user_input[id]) user_input[id] = {}
      let old = {...user_input[id]};
      let combined = {...old, ...input}
      console.warn(combined, old, input)
      setUserInput({...user_input, [id]: combined});
  
    })
    socket.connect();
    console.warn(props)
    socket.emit('host', {session_id: session_id, starting_input: 'wasds'});
 
  }, []);

  console.warn(user_input)
  return (
    <div>
      <button onClick={() => {socket.emit('change-input', {input_type: 'text-submit', session_id})}}> Click to use text sub input </button>
      <button onClick={() => {socket.emit('change-input', {input_type: 'wasds', session_id})}}> Click to use wasds</button>
      <button onClick={() => {socket.emit('change-input', {input_type: 'text-live', session_id})}}> Click to use text live</button>
    </div>
  );
}

export default Host;
