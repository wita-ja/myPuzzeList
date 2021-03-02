import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GlobalHeader from '../GlobalHeader';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.styles.css';
import PuzzlesPage from '../PuzzlesPage/PuzzlesPage';

const isLogged: boolean = false;
const username: string = 'Vitalij';

//TODO add components to render into routes
//TODO find way to make pageSize configurable
function App() {
  return (
    <Router>
      <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
      <Switch>
        <Route exact path='/'>
          <PuzzlesPage pageSize={2} />
        </Route>
        <Route path='puzzles/:page'>
          <PuzzlesPage pageSize={2} />
        </Route>
        <Route path='/login'>
          <h2>Login page/modal </h2>
        </Route>
        <Route path='/puzzle/:id'>
          <h2>Specific puzzle</h2>
        </Route>
        <Route path='/user/profile'>
          <h2>User profile</h2>
        </Route>
        <Route path='/user/collection'>
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
