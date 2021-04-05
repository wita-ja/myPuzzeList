import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GlobalHeader from '../GlobalHeader';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.styles.css';
import PuzzlesPage from '../PuzzlesPage/PuzzlesPage';
import PuzzleDescriptionPage from '../PuzzleDescriptionPage';
import UserProfilePage from '../UserProfilePage';
import TestingUsersUsername from '../../enums/TestingUsersUsername';
import UserPuzzlesPage from '../UserPuzzlesPage';

//after login set isLogged true and username
//after logout set isLogged to false and username to ''
const isLogged: boolean = true;
let username: string = TestingUsersUsername.admin;

//TODO add components to render into routes
function App() {
  return (
    <Router>
      <GlobalHeader isLogged={isLogged} username={username}></GlobalHeader>
      <Switch>
        <Route exact path='/'>
          <PuzzlesPage />
        </Route>
        <Route path='/puzzles/:page'>
          <PuzzlesPage />
        </Route>
        <Route path='/login'>
          <h2>Login page/modal </h2>
        </Route>
        <Route path='/puzzle/:puzzleId'>
          <PuzzleDescriptionPage />
        </Route>
        <Route path='/user/:username/collection/:puzzleId'>
          <div>Collection item editing</div>
        </Route>
        <Route path='/user/:username/collection'>
          <UserPuzzlesPage username={username} />
        </Route>
        <Route path='/user/:username'>
          <UserProfilePage />
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
