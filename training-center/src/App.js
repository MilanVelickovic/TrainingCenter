import { BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import Reserve from './pages/Reserve/Reserve';
import Details from './pages/Details/Details';

import './App.css';

function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin" component={SignIn}/>
          {props.authorized ?
            <>
              <Route path="/home" exact component={Home}/>
              <Route path="/reserve/:date" exact component={Reserve}/>
              <Route path="/reserve/:date/:time" component={Details}/>
            </>
          : null}
          <Redirect from="/" to="/signin"/>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    authorized: state.userReducer.authorized
  }
}

export default connect(mapStateToProps)(App);
