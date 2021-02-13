import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react';

interface NavigationBarProps {
  isLogged: boolean;
  username: string;
}

const NavigationBar = (props: NavigationBarProps) => {
  const [isLogged, setLogged] = useState(props.isLogged);
  return (
    <Menu color='grey' fluid>
      <Menu.Item as={Link} to='/'>
        Puzzles
      </Menu.Item>
      <Menu.Item as={Link} to='/login'>
        Login page(laterModal)
      </Menu.Item>
      {props.isLogged && (
        <Menu.Item position='right'>
          <Dropdown text={props.username} pointing='top right'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/user/collection'>
                My collection
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/user/profile'>
                My profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to='/'
                onClick={
                  //TODO find way to pass it to parent
                  () => {
                    setLogged(!isLogged);
                  }
                }
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
      {!props.isLogged && (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button>Sign up</Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Log in</Button>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default NavigationBar;
