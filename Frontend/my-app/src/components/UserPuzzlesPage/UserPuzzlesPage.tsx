import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import UserPuzzlesTable from './UserPuzzlesTable';

const UserPuzzlesPage = (props: { username: string }) => {
  const { username } = props;
  return (
    <>
      <Container>
        <div>
          <Header as='h1'>{`${props.username} Puzzle Collection`}</Header>
        </div>
        <UserPuzzlesTable username={username}></UserPuzzlesTable>
      </Container>
    </>
  );
};

export default UserPuzzlesPage;
