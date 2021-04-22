import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  InputOnChangeData,
  Modal,
} from 'semantic-ui-react';
import { LoginResponseDto } from '../../../dataTypes/postDtoTypes/LoginResponseDto';

interface LoginModalProps {
  onClose: () => void;
  onOpen: () => void;
  setUserRole: (value: React.SetStateAction<string>) => void;
  setUserName: (value: React.SetStateAction<string>) => void;
  setIsLogged: (value: React.SetStateAction<boolean>) => void;
  open: boolean;
  trigger: {};
}

const LoginModal = (props: LoginModalProps) => {
  const {
    onClose,
    onOpen,
    setUserRole,
    setUserName,
    setIsLogged,
    open,
    trigger,
  } = props;

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/login`,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');

  const [postErrorMessage, setPostErrorMessage] = useState('');

  //Use effect which triggers submit button enabling (actions - interaction with required fields)
  useEffect(() => {
    if (usernameInputValue == '' || passwordInputValue == '') {
      setIsLoginDisabled(true);
    } else setIsLoginDisabled(false);
  }, [usernameInputValue, passwordInputValue]);

  useEffect(() => {
    setPostErrorMessage(postError?.response?.data);
  }, [postError]);

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    const response = await executePost({
      data: {
        username: usernameInputValue,
        password: passwordInputValue,
      },
    });

    if (response.data.loggedIn === true) {
      console.log('Data px: ' + JSON.stringify(response.data));
      onSuccess(response.data);
      onModalClose();
    } else {
      setPostErrorMessage('Username or Password is incorrect');
    }
  };

  const onSuccess = (data: LoginResponseDto) => {
    console.log('Data nx: ' + JSON.stringify(data));

    setIsLogged(data.loggedIn);
    setUserRole(data.userRole);
    setUserName(data.username);
  };

  const onModalClose = () => {
    setPasswordInputValue('');
    setUsernameInputValue('');
    setIsLoginDisabled(true);
    setPostErrorMessage('');
    onClose();
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setUsernameInputValue(data.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPasswordInputValue(data.value);
  };

  return (
    <Modal
      open={open}
      onClose={onModalClose}
      onOpen={onOpen}
      trigger={trigger}
      size='tiny'
      closeOnEscape
      closeOnDimmerClick={false}
      closeIcon
    >
      <Modal.Header>
        <Container textAlign='center'>Login</Container>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Form.Input
              label='Username'
              labelPosition='left'
              placeholder='Username'
              name='Username'
              value={usernameInputValue}
              onChange={handleUsernameChange}
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Password'
              labelPosition='left'
              placeholder='Password'
              name='Password'
              type='password'
              value={passwordInputValue}
              onChange={handlePasswordChange}
            ></Form.Input>
          </Form.Field>
          <Button
            type='submit'
            onClick={handleLogin}
            disabled={isLoginDisabled}
          >
            Log in
          </Button>
        </Form>
        {
          //TODO error handling component
          //@ts-ignore
          (postErrorMessage?.error === 'Internal Server Error' ||
            //@ts-ignore
            postErrorMessage?.error === 'Bad Request') && (
            <Container textAlign='center'>
              <Header as='h5' className='error'>
                {postError?.response?.data.error}
              </Header>
            </Container>
          )
        }
        {
          //TODO error handling component
          postErrorMessage === 'Username or Password is incorrect' && (
            <Container textAlign='center'>
              <Header as='h5' className='error'>
                {postErrorMessage}
              </Header>
            </Container>
          )
        }
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
