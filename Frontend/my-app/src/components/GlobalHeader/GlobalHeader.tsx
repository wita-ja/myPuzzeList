import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import NavigationBar from '../NavigationBar';

import './GlobalHeader.styles.css';

interface GlobalHeaderProps {
  isLogged: boolean;
  username: string;
}

const GlobalHeader = (props: GlobalHeaderProps) => {
  return (
    <Segment raised>
      <Header as='h2' floated='left' id='globalHeader'>
        MybrainPuzzleList
      </Header>

      <NavigationBar
        isLogged={props.isLogged}
        username={props.username}
      ></NavigationBar>
    </Segment>
  );
};

export default GlobalHeader;
