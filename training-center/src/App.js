import { BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/home" component={Home}/>
          <Redirect from="/" to="/signin"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
