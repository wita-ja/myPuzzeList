import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Header } from 'semantic-ui-react';
import UserPuzzlesTable from './UserPuzzlesTable';

const UserPuzzlesPage = (props: { username: string; isLogged: boolean }) => {
  const { username } = props;

  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  useEffect(() => {
    if (showUpdateToast === true) {
      notifyUpdate();
      setTimeout(() => setShowUpdateToast(false), 3500);
    } else if (showDeleteToast === true) {
      notifyDelete();
      setTimeout(() => setShowUpdateToast(false), 3500);
    }
  }, [showUpdateToast, showDeleteToast]);

  const notifyUpdate = () => {
    toast.success('Puzzle information was updated!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const notifyDelete = () => {
    toast.success('Puzzle was removed from collection!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };
  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} />
      <Container>
        <div>
          <Header as='h1'>{`${username} Puzzle Collection`}</Header>
        </div>
        <UserPuzzlesTable
          username={username}
          enableUpdateToast={() => setShowUpdateToast(true)}
          enableDeleteToast={() => setShowDeleteToast(true)}
        ></UserPuzzlesTable>
      </Container>
    </>
  );
};

export default UserPuzzlesPage;
