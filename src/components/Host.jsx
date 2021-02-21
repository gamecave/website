import React, { useEffect, useState } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

// VoxeetSDK.initialize( process.env.REACT_APP_DOLBY_KEY, process.env.REACT_APP_DOLBY_SECRET);

const unityContext = new UnityContext({
  loaderUrl: "/build/tanksTest.loader.js",
  dataUrl: "/build/tanksTest.data",
  frameworkUrl: "/build/tanksTest.framework.js",
  codeUrl: "/build/tanksTest.wasm",
});


const Host = (props) => {
  const [user_input, setUserInput] = useState({});

  window.GAME_CAVE_GET_USER_INPUT = () => user_input;

  let session_id = props.match.params.session_id
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on('create-player', (id) => {
      unityContext.send('GameCaveConnector', 'createPlayer', id)
    })
    socket.on('send-input', (input, id) => {
      
      if (!user_input[id]) user_input[id] = {}
      let old = {...user_input[id]};
      let combined = {...old, ...input}
      setUserInput({...user_input, [id]: combined});
  
    })
    socket.connect();
    socket.emit('host', {session_id: session_id, starting_input: 'wasds'});
    
    console.warn('props.match.params.session_id', props.match.params.session_id)
    VoxeetSDK.session.open({ name: 'Host' }).then(()=>
    VoxeetSDK.conference.create({ alias: props.match.params.session_id }))
    .then((conference) => VoxeetSDK.conference.join(conference, {}))
    .then(() => {
      console.warn('HYPE')
      VoxeetSDK.conference.startScreenShare()
      .then(() => {
          console.warn('recording');
      })
    })
    .catch((e) => console.log('Something wrong happened : ' + e))
  }, []);

  return (
    <div>
      <Unity unityContext={unityContext} />
      <button onClick={() => {socket.emit('change-input', {input_type: 'text-submit', session_id})}}> Click to use text sub input </button>
      <button onClick={() => {socket.emit('change-input', {input_type: 'wasds', session_id})}}> Click to use wasds</button>
      <button onClick={() => {socket.emit('change-input', {input_type: 'text-live', session_id})}}> Click to use text live</button>
    </div>
  );
}

export default Host;
