import React, { useEffect, useState } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import NavigationBar from '../NavigationBar';

import './GlobalHeader.styles.css';

interface GlobalHeaderProps {
  setUserRole: (value: React.SetStateAction<string>) => void;
  setUserName: (value: React.SetStateAction<string>) => void;
  setIsLogged: (value: React.SetStateAction<boolean>) => void;
}

const GlobalHeader = (props: GlobalHeaderProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    props.setIsLogged(isLogged);
  }, [isLogged]);

  useEffect(() => {
    props.setUserName(username);
  }, [username]);

  useEffect(() => {
    props.setUserRole(userRole);
  }, [userRole]);
  return (
    <Segment raised>
      <Header as='h2' floated='left' id='globalHeader'>
        MybrainPuzzleList
      </Header>

      <NavigationBar
        setIsLogged={(value) => setIsLogged(value)}
        setUserName={(value) => setUsername(value)}
        setUserRole={(value) => setUserRole(value)}
      ></NavigationBar>
    </Segment>
  );
};

export default GlobalHeader;
