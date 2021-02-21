import React from 'react';
import Dotenv from 'dotenv';
import { reducer as voxeetReducer } from "@voxeet/react-components"
import thunkMidleware from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux";
import {VoxeetProvider } from "@voxeet/react-components"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "nes.css/css/nes.min.css";
import "@voxeet/react-components/dist/voxeet-react-components.css"
import './App.css';
import Developers from './components/Developers';
import Home from './components/Home';
import Host from './components/Host';
import Game from './components/Game';
import Play from './components/Play';


const reducers = combineReducers({
  voxeet: voxeetReducer,
})

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware))

Dotenv.config();

function App() {
  return (
    <VoxeetProvider store={configureStore()}>
      <Router>
        <Switch>
        <Route path="/developers" component={Developers}/>
          <Route path="/host/:session_id" component={Host}/>
          <Route path="/game/:gameId" component={Game}/>
          <Route path="/play" component={Play}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </VoxeetProvider>
  );
}

export default App;
