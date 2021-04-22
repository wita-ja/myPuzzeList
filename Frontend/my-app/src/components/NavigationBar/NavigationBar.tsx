import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface NavigationBarProps {
  setUserRole: (value: React.SetStateAction<string>) => void;
  setUserName: (value: React.SetStateAction<string>) => void;
  setIsLogged: (value: React.SetStateAction<boolean>) => void;
}

const NavigationBar = (props: NavigationBarProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showUserCreatedToast, setShowUserCreatedToast] = useState(false);

  useEffect(() => {
    props.setIsLogged(isLogged);
  }, [isLogged]);

  useEffect(() => {
    props.setUserName(username);
  }, [username]);

  useEffect(() => {
    props.setUserRole(userRole);
  }, [userRole]);

  useEffect(() => {
    if (showUserCreatedToast === true) {
      notify();
      setTimeout(() => setShowUserCreatedToast(false), 3500);
    }
  }, [showUserCreatedToast]);

  const notify = () => {
    toast.success('User was  successfully created!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  return (
    <Menu color='grey' fluid>
      <ToastContainer position='top-center' autoClose={3000} />
      <Menu.Item as={Link} to='/'>
        Puzzles
      </Menu.Item>
      {isLogged && userRole == 'Admin' && (
        <Menu.Item as={Link} to='/submittedPuzzles/1'>
          Submitted Puzzles
        </Menu.Item>
      )}
      {isLogged && (
        <Menu.Item position='right'>
          <Dropdown text={username} pointing='top right'>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/user/${username}/collection/page/1`}
              >
                My collection
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/user/${username}`}>
                My profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to='/'
                onClick={() => {
                  setIsLogged(!isLogged);
                }}
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
      {!isLogged && (
        <Menu.Menu position='right'>
          <Menu.Item position='right'>
            <SignUpModal
              open={showSignUpModal}
              onOpen={() => setShowSignUpModal(true)}
              onClose={() => setShowSignUpModal(false)}
              onSuccess={() => setShowUserCreatedToast(true)}
              trigger={<Button>Sign up</Button>}
            ></SignUpModal>
          </Menu.Item>
          <Menu.Item position='right'>
            <LoginModal
              open={showLoginModal}
              onOpen={() => setShowLoginModal(true)}
              onClose={() => setShowLoginModal(false)}
              setUserName={(value) => setUsername(value)}
              setIsLogged={(value) => setIsLogged(value)}
              setUserRole={(value) => setUserRole(value)}
              trigger={<Button>Log in</Button>}
            ></LoginModal>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default NavigationBar;
