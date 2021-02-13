import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GlobalHeader from '../GlobalHeader';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.styles.css';

const isLogged: boolean = false;
const username: string = 'Vitalij';

//TODO add components to render into routes
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
          <h2>Puzzle list </h2>
        </Route>
        <Route path='/login'>
          <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
          <h2>Login page/modal </h2>
        </Route>
        <Route path='/puzzle/:id'>
          <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
          <h2>Specific puzzle</h2>
        </Route>
        <Route path='/user/profile'>
          <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
          <h2>User profile</h2>
        </Route>
        <Route path='/user/collection'>
          <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
          <h2>User collection</h2>
        </Route>
        <Route path='*'>
          <h1>404 page not found</h1>
          <Button as={Link} to={'/'}>
            Back to home page
          </Button>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
