import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import GlobalHeader from '../GlobalHeader';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.styles.css';
import PuzzlesPage from '../PuzzlesPage/PuzzlesPage';
import PuzzleDescriptionPage from '../PuzzleDescriptionPage';
import UserProfilePage from '../UserProfilePage';
import TestingUsersUsername from '../../enums/TestingUsersUsername';
import UserPuzzlesPage from '../UserPuzzlesPage';
import SubmittedPuzzlePage from '../SubmittedPuzzlesPage';
import SubmittedPuzzleDescriptionPage from '../SubmittedPuzzleDescriptionPage';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');

  return (
    <Router>
      <GlobalHeader
        setIsLogged={(value) => setIsLogged(value)}
        setUserName={(value) => setUsername(value)}
        setUserRole={(value) => setUserRole(value)}
      ></GlobalHeader>
      <Switch>
        <Route path='/puzzles/:page'>
          <PuzzlesPage isLogged={isLogged} />
        </Route>
        <Route path='/submittedPuzzles/:page'>
          {isLogged && userRole == 'Admin' ? (
            <SubmittedPuzzlePage />
          ) : (
            <Redirect to={{ pathname: '/notFound' }} />
          )}
        </Route>
        <Route path='/login'>
          <h2>Login page/modal </h2>
        </Route>
        <Route path='/puzzle/:puzzleId'>
          <PuzzleDescriptionPage username={username} isLogged={isLogged} />
        </Route>
        <Route path='/submittedPuzzle/:puzzleId'>
          <SubmittedPuzzleDescriptionPage isLogged={isLogged} />
        </Route>
        <Route path='/user/:username/collection/page/:page'>
          <UserPuzzlesPage username={username} isLogged={isLogged} />
        </Route>
        <Route path='/user/:username/collection/:puzzleId'>
          <div>Collection item editing</div>
        </Route>
        <Route path='/user/:username'>
          <UserProfilePage />
        </Route>
        <Route exact path='/'>
          <Redirect to={{ pathname: '/puzzles/1' }} />
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
