import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });


const handleClick = (session_id) => {
  socket.emit('join', {session_id});
}

const Play = (props) => {
  const [game_code, setGameCode] = useState("");
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.connect();
  }, [])
  
  return (
      <div className="flex-container">
        <button type="button" className="nes-btn is-warning" onClick={props.history.goBack}>{"< Back"}</button>

        <h1>Join a game</h1>
        <div className="flex-container" style={{maxWidth: '300px'}}>
          <div className="nes-field">
            <label>Game code:</label>
            <input type="text" id="name_field" className="nes-input" onChange={(event) => setGameCode(event.target.value)}/>
          </div>
          <button type="button" className="nes-btn is-primary" onClick={() => handleClick(game_code)}>Join</button>
        </div>
      </div>
  );
}

export default Play;