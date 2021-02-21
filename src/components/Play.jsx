import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import DolbyChat from './DolbyChat';
import GameView from './GameView';
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });
console.warn('env', process.env.REACT_APP_DOLBY_KEY, process.env.REACT_APP_DOLBY_SECRET)


const handleClick = (session_id) => {
  socket.emit('join', {session_id, username: USERNAME});
}

let SESSION_ID = "";
let USERNAME = "";

const Play = (props) => {
  const [game_code, setGameCode] = useState("");
  const [username, setUsername] = useState("default");
  const [joinChat, setJoinChat] = useState(true);
  const [spectateGame, setSpectateGame] = useState(true);
  const [input_type, setInputType] = useState(null)
  const [error, setError] = useState(false);

  SESSION_ID = game_code;
  USERNAME = username;
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on('change-input', (new_input_type) => setInputType(new_input_type));
    socket.on('error', (error) => {setError(error)});
    socket.connect();
    console.error("BOOM")

  }, [])

  if (error) {
    return (
      <div className="flex-container">
        <div className="nes-container  with-title" style={{marginTop:'30px'}}>
          <p className="title nes-text is-error">There was an error</p>
          <span>There was an error! Your game code may have been wrong or something crazy happened! Refresh the page and try again :) </span> 
        </div>
      </div>
    )
  }

  if (input_type) {
    let comp = null;
    switch (input_type) {
      case 'wasds':
        comp =  <WASDS_INPUTTER session_id={game_code}/>;
        break;
      case 'text-submit':
        comp = <TEXT_SUBMIT_INPUTTER session_id={game_code}/>
        break
      case 'text-live':
        comp = <TEXT_LIVE_INPUTTER session_id={game_code}/>
        break
      default:
       comp = null
    }

    return (
      <div className="flex-center">
        {joinChat && <DolbyChat session_id={game_code} username={username}/>}
        {spectateGame && <GameView />}
        {comp}
      </div>
    )

  }

  return (
      <div className="flex-container">
        <button type="button" className="nes-btn is-warning" onClick={props.history.goBack}>{"< Back"}</button>

        <h1>Join a game</h1>
        <div className="flex-container" style={{alignItems: 'normal'}}>
          <div className="flex-row">
            <div className="nes-field" style={{maxWidth: '300px'}}>
              <label>Game code:</label>
              <input type="text" id="name_field" className="nes-input" onChange={(event) => setGameCode(event.target.value)}/>
              <label>Username:</label>
              <input type="text"  className="nes-input" onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="flex-container" style={{alignItems: 'normal'}}>
              <div style={{margin: '0 50px'}}>
                <label>
                <label>Join chat   :</label>
                  <input type="radio" class="nes-radio" name="joinchat" checked onChange={(event) => setJoinChat(event.target.value)}/>
                  <span>Yes</span>
                </label>
                <label>
                  <input type="radio" class="nes-radio" name="joinchat" onChange={(event) => setJoinChat(event.target.value)}/>
                  <span>No</span>
                </label>
              </div>

              <div style={{margin: '0 50px'}}>
                <label>
                <label>Watch Game  :</label>
                  <input type="radio" class="nes-radio" name="spectategame" checked onChange={(event) => setSpectateGame(event.target.value)}/>
                  <span>Yes</span>
                </label>
                <label>
                  <input type="radio" class="nes-radio" name="spectategame" onChange={(event) => setSpectateGame(event.target.value)}/>
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>

          <button type="button" className="nes-btn is-primary" onClick={() => handleClick(game_code)}>Join</button>
        </div>
      </div>
  );
}


let wasds_last_state = {
  vertical: 0,
  horizontal: 0,
  action: 0
}

const wasdsHandlerAdd = (event) => {
  let new_state = {...wasds_last_state};
  switch (event.key) {
    case 'w':
      new_state.vertical = 1;
      break;
    case 'a':
      new_state.horizontal = -1;
      break;
    case 's':
      new_state.vertical = -1;
      break;
    case 'd':
      new_state.horizontal = 1;
      break;
    case ' ':
      new_state.action = 1;
      break;
    default:
      break
  }

  if (new_state.vertical !== wasds_last_state.vertical || new_state.horizontal !== wasds_last_state.horizontal || new_state.action !== wasds_last_state.action) {
    socket.emit('send-input', {input_data: new_state, session_id: SESSION_ID, username: USERNAME})
  }

  wasds_last_state = new_state;
  console.warn(wasds_last_state)
}

const wasdsHandlerSub = (event) => {
  switch (event.key) {
    case 'w':
      wasds_last_state.vertical -= 1;
      break;
    case 'a':
      wasds_last_state.horizontal += 1;
      break;
    case 's':
      wasds_last_state.vertical += 1;
      break;
    case 'd':
      wasds_last_state.horizontal -= 1;
      break;
    case ' ':
      wasds_last_state.action = 0;
      break;
    default:
      break
  }
  console.warn(wasds_last_state)
  socket.emit('send-input', {input_data: wasds_last_state, session_id: SESSION_ID, username: USERNAME})
}

const WASDS_INPUTTER = ({session_id, toggleRerender}) => {
  // socket.emit('send-input', {input_data: wasds_last_state, session_id})
  useEffect(() => {
    document.addEventListener("keydown", wasdsHandlerAdd, false);
    document.addEventListener("keyup", wasdsHandlerSub, false);

    return () => {
      document.removeEventListener("keydown", wasdsHandlerAdd, false);
      document.removeEventListener("keyup", wasdsHandlerSub, false);
    };
  }, []);

  return (
    <div className="nes-container  with-title" style={{margin:'30px'}}>
      <p className="title nes-text is-primary">Controller (or wasd/space)</p>
      <div className="flex-row" style={{alignItems: 'center'}}>
        <div className="flex-center">
          <div className="flex-row">
            <button type="button" class="nes-btn is-primary" onClick={(event) => console.warn(event)}>^</button>
          </div>
          <div className="flex-row">
            <button type="button" class="nes-btn is-primary" style={{margin: '0 40px'}}>{"<"}</button>
            <button type="button" class="nes-btn is-primary" style={{margin: '0 40px'}}>{">"}</button>
          </div>
          <div className="flex-row"><button type="button" class="nes-btn is-primary">V</button></div>
        </div>
        <button type="button" class="nes-btn is-primary">ACTION</button>
      </div>
    </div>
  )
}

const TEXT_SUBMIT_INPUTTER = ({session_id}) => {
  let [text_value, setTextValue] = useState("");
  return (
    <div className="nes-container  with-title" style={{margin:'30px'}}>
      <p className="title nes-text is-primary">Type, then send input</p>
      <div className="flex-row" style={{alignItems: 'center'}}>
        <div className="nes-field is-inline">
          <label for="inline_field"></label>
          <input type="text" id="inline_field" className="nes-input is-success" placeholder="Type here.." onChange={(event) => setTextValue(event.target.value)}/>
        </div>
        <button type="button" class="nes-btn is-primary" onClick={() => {console.warn("CLICK", text_value); socket.emit('send-input', {session_id, input_data: {text: text_value}, username: USERNAME})}}>SEND</button>
      </div>
    </div>
  )
}

const TEXT_LIVE_INPUTTER = ({session_id}) => {
  return (
    <div className="nes-container  with-title" style={{margin:'30px'}}>
      <p className="title nes-text is-primary">Input is sent as you type</p>
      <div className="flex-row" style={{alignItems: 'center'}}>
        <div className="nes-field is-inline">
          <label for="inline_field"></label>
          <input type="text" id="inline_field" className="nes-input is-warning" placeholder="Type here.." onChange={(event) => socket.emit('send-input', {session_id, username: USERNAME, input_data: {text: event.target.value}})}/>
        </div>
      </div>
    </div>
  )
}

export default Play;