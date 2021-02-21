import React, { useEffect, useState } from 'react';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';


let vref = null;
const GameView = () => {
  const [vstream, setStream] = useState(null);

  useEffect(() => {
    VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
      if (stream.type === 'ScreenShare') {
        console.warn('FOUND SCREEN SHARE')
        setStream(stream);
        vref.srcObject = stream;
      }
    });
    VoxeetSDK.conference.on('streamUpdated', (participant, stream) => {
      if (stream.type === 'ScreenShare') {
        console.warn('FOUND SCREEN SHARE')
        vref.srcObject = stream;
        setStream(stream);
      }
    });
  }, [])

  console.warn("Stream", vstream);

  // TODO show host isnt streaming
  if (!vstream) return null;

  return (
    <div className="nes-container  with-title" style={{marginTop:'30px'}}>
      <p className="title nes-text is-error">Game stream</p>
      <video id="video-chat" ref={thing => {vref = thing; if (vstream) thing.srcObject = vstream}} autoPlay="true">
      </video>
    </div>
  )
}

export default GameView;