
import './App.css';
import Developers from './components/Developers';
import Home from './components/Home';
import Host from './components/Host';
import Create from './components/Create';
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
        <Route path="/host/:sessionId" component={Host}/>
        <Route path="/game/:gameId" component={Create}/>
        <Route path="/play" component={Play}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
