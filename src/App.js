
import './App.css';
import Developers from './components/Developers';
import Home from './components/Home';
import Host from './components/Host';
import Game from './components/Game';
import Play from './components/Play';
import "nes.css/css/nes.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/developers" component={Developers}/>
        <Route path="/host/:session_id" component={Host}/>
        <Route path="/game/:gameId" component={Game}/>
        <Route path="/play" component={Play}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
