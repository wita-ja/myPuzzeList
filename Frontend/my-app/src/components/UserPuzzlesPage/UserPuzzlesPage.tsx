import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import UserPuzzlesTable from './UserPuzzlesTable';

const UserPuzzlesPage = (props: { username: string; isLogged: boolean }) => {
  const { username } = props;
  return (
    <>
      <Container>
        <div>
          <Header as='h1'>{`${username} Puzzle Collection`}</Header>
        </div>
        <UserPuzzlesTable username={username}></UserPuzzlesTable>
      </Container>
    </>
  );
};

export default UserPuzzlesPage;
