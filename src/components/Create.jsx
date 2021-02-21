import React from 'react';

const handleClick = (history) => {
  fetch(`${URL}/create/maze`).then(r => r.json()).then(resp => {
    console.warn(resp);
    history.push('/host/pp');
  })
}

const Create = (props) => {
  console.warn(props)
  return (
    <div>
      <button onClick={() => handleClick(props.history)}> Click to create a game </button>
    </div>
  );
}

export default Create;
