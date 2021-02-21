import React from 'react';
import '../App.css'

const changePage = (history, path) => {
  history.push(path);
}



const cannedData = [
  {
    game_id: '12345',
    title: 'Tanks',
    image_url: 'https://www.mobygames.com/images/shots/l/216847-a-collection-of-activision-classic-games-for-the-atari-2600.png',
    description: 'A great game to shoot your friends and such with'
  },
  {
    game_id: '666666',
    title: 'Maze',
    image_url: 'https://atariage.com/2600/screenshots/s_ET_2.png',
    description: 'Solve a puzzle with additional people'
  },
  {
    game_id: '12343',
    title: 'Tanks',
    image_url: 'https://www.mobygames.com/images/shots/l/216847-a-collection-of-activision-classic-games-for-the-atari-2600.png',
    description: 'A great game to shoot your friends and such with'
  },
  {
    game_id: '666688',
    title: 'Maze',
    image_url: 'https://atariage.com/2600/screenshots/s_ET_2.png',
    description: 'Solve a puzzle with additional people'
  },
  {
    game_id: '12345',
    title: 'Tanks',
    image_url: 'https://www.mobygames.com/images/shots/l/216847-a-collection-of-activision-classic-games-for-the-atari-2600.png',
    description: 'A great game to shoot your friends and such with'
  },
  {
    game_id: '666666',
    title: 'Maze',
    image_url: 'https://atariage.com/2600/screenshots/s_ET_2.png',
    description: 'Solve a puzzle with additional people'
  },
  {
    game_id: '12343',
    title: 'Tanks',
    image_url: 'https://www.mobygames.com/images/shots/l/216847-a-collection-of-activision-classic-games-for-the-atari-2600.png',
    description: 'A great game to shoot your friends and such with'
  },
  {
    game_id: '666688',
    title: 'Maze',
    image_url: 'https://atariage.com/2600/screenshots/s_ET_2.png',
    description: 'Solve a puzzle with additional people'
  },
]




const Home = (props) => {
  const renderedGameContainers = cannedData.map(({game_id, title, image_url}) => (
    <div className="nes-container  with-title flex-center" style={{marginTop:'30px', width: '24%', height: '22vw', minWidth: '120px'}}>
      <p className="title nes-text is-error">{title}</p>
      <img src={image_url} style={{width:'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}} alt={`Thumbnail of ${title}`}/>
    </div>
  ));

  return (
    <div className="flex-container">
      <h1>Game Cave</h1>
      <div className="flex-row">
        <button type="button" className="nes-btn is-primary" onClick={() => changePage(props.history, '/play')}>Join a game</button>
        <button type="button" className="nes-btn" onClick={() => changePage(props.history, '/developers')}>Developers</button>
        <button type="button" className="nes-btn" onClick={() => changePage(props.history, 'https://github.com/gamecave')}>Contribute</button>
      </div>

      <div className="nes-container  with-title" style={{marginTop:'30px'}}>
        <p className="title nes-text is-error">How to host a game</p>
        <span>To host a game, select a game in our library. On the next page, you will see a </span> 
        <button type="button" className="nes-btn is-success"> Host game </button> 
        <span> button.</span>
      </div>
      <div className="flex-row">
        {renderedGameContainers}
      </div>
    </div>
  );
}

export default Home;