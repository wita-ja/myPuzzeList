import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  DropdownProps,
  Form,
  Header,
  InputOnChangeData,
  Modal,
} from 'semantic-ui-react';
import { ageGroups } from '../../../enums/AgeGroups';

interface LoginModalProps {
  onClose: () => void;
  onOpen: () => void;
  onSuccess: () => void;
  open: boolean;
  trigger: {};
}

interface isFieldFilled {
  usernameFilled: boolean;
  emailFilled: boolean;
  ageGroupFilled: boolean;
  passwordFilled: boolean;
  passwordConfirmFilled: boolean;
}

const SignUpModal = (props: LoginModalProps) => {
  const { onClose, onOpen, onSuccess, open, trigger } = props;

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/create`,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState(
    ''
  );
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [ageGroupDropdownValue, setAgeGroupDropdownValue] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const [isFieldFilled, setIsFieldFilled] = useState<isFieldFilled>({
    usernameFilled: false,
    emailFilled: false,
    ageGroupFilled: false,
    passwordFilled: false,
    passwordConfirmFilled: false,
  });

  const [postErrorMessage, setPostErrorMessage] = useState('');

  //Use effect which triggers submit button enabling (actions - interaction with required fields)
  useEffect(() => {
    handleSubmitButtonStatus()
      ? setIsSubmitDisabled(false)
      : setIsSubmitDisabled(true);
  }, [isFieldFilled]);

  useEffect(() => {
    setPostErrorMessage(postError?.response?.data);
  }, [postError]);

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    const response = await executePost({
      data: {
        username: usernameInputValue,
        password: confirmPasswordInputValue,
        ageGroup: ageGroupDropdownValue,
        email: emailInputValue,
      },
    });

    if (response.status === 201) {
      onSuccess();
      onModalClose();
    } else {
      setPostErrorMessage('Internal server error');
    }
  };

  const onModalClose = () => {
    setAgeGroupDropdownValue('');
    setConfirmPasswordInputValue('');
    setEmailInputValue('');
    setPasswordInputValue('');
    setUsernameInputValue('');
    setPostErrorMessage('');
    onClose();
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setUsernameInputValue(data.value);
    data.value.length > 0
      ? setIsFieldFilled({ ...isFieldFilled, usernameFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, usernameFilled: false });
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setEmailInputValue(data.value.toLowerCase());
    if (data.value.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }

    data.value.length > 0
      ? setIsFieldFilled({ ...isFieldFilled, emailFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, emailFilled: false });
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPasswordInputValue(data.value);

    data.value.length > 0
      ? setIsFieldFilled({ ...isFieldFilled, passwordFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, passwordFilled: false });
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    //error if not same as passowrd
    setConfirmPasswordInputValue(data.value);

    if (data.value === passwordInputValue) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }

    data.value.length > 0
      ? setIsFieldFilled({ ...isFieldFilled, passwordConfirmFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, passwordConfirmFilled: false });
  };

  const handleAgeGroupChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setAgeGroupDropdownValue(
      //@ts-ignore
      data.value?.toString()
    );
    //@ts-ignore
    data.value.toString().length > 0
      ? setIsFieldFilled({ ...isFieldFilled, ageGroupFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, ageGroupFilled: false });
  };

  const handleSubmitButtonStatus = (): boolean => {
    if (
      isFieldFilled.usernameFilled &&
      isFieldFilled.emailFilled &&
      isFieldFilled.ageGroupFilled &&
      isFieldFilled.passwordConfirmFilled &&
      isFieldFilled.passwordFilled &&
      emailValid &&
      confirmPasswordValid
    ) {
      return true;
    } else return false;
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
        <Container textAlign='center'>Sign up</Container>
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
              label='Email'
              labelPosition='left'
              placeholder='Email'
              name='Email'
              value={emailInputValue}
              onChange={handleEmailChange}
              error={
                emailValid == true
                  ? false
                  : {
                      content: 'Please enter a valid email address',
                      pointing: 'below',
                    }
              }
            ></Form.Input>
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              selection
              fluid
              label='Age group'
              labelPosition='left'
              placeholder='Age group'
              name='Age group'
              options={ageGroups}
              onChange={handleAgeGroupChange}
            ></Form.Dropdown>
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
          <Form.Field>
            <Form.Input
              label='Confirm password'
              labelPosition='left'
              placeholder='Password'
              name='Confirm password'
              type='Confirm password'
              value={confirmPasswordInputValue}
              onChange={handleConfirmPasswordChange}
              error={
                confirmPasswordValid == true
                  ? false
                  : {
                      content: 'Passwords do not match',
                      pointing: 'below',
                    }
              }
            ></Form.Input>
          </Form.Field>
          <Button
            type='submit'
            onClick={handleLogin}
            disabled={isSubmitDisabled}
          >
            Sign up
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
      </Modal.Content>
    </Modal>
  );
};

export default SignUpModal;
