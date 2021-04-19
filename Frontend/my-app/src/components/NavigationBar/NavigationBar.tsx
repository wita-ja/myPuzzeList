import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import LoginModal from './LoginModal';

interface NavigationBarProps {
  setUserRole: (value: React.SetStateAction<string>) => void;
  setUserName: (value: React.SetStateAction<string>) => void;
  setIsLogged: (value: React.SetStateAction<boolean>) => void;
}

const NavigationBar = (props: NavigationBarProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    <Menu color='grey' fluid>
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
            <Button>Sign up</Button>
          </Menu.Item>
          <Menu.Item position='right'>
            <LoginModal
              open={showModal}
              onOpen={() => setShowModal(true)}
              onClose={() => setShowModal(false)}
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
