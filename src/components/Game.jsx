import React from 'react';
const URL = "http://localhost:3000";

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



const handleClick = (history, game_id) => {
  console.warn('here')
  fetch(`${URL}/create/${game_id}`).then(r => {console.warn(r); return r.json()}).then(resp => {
    console.warn(resp);
    history.push(`/host/${resp.session_id}`);
  }).catch(e => console.warn(e))
}

const Game = (props) => {
  console.warn(props)
  const possibleGames = cannedData.filter(({game_id}) => game_id === props.match.params.gameId)
  if (possibleGames.length < 1) return (<div>No Game with this id</div>)

  const current = possibleGames[0];

  return (
    <div className="flex-container">
      <h1>{current.title}</h1>
      <h3>{current.description}</h3>
      <img src={current.image_url} alt="thumbnail"></img>
      <button type="button" className="nes-btn is-success"></button>
      <button type="button" className="nes-btn is-success" onClick={() => handleClick(props.history, props.match.params.gameId)}>Host a game</button>
    </div>
  );
}

export default Game;
