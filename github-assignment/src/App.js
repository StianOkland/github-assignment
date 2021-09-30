import Home from './Home'
import User from './User'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/user/:username' render={(props) => (
              <User username={props.match.params.username}/>
            )}>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App