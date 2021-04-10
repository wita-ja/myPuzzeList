import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  DropdownItemProps,
  Form,
  Grid,
  GridRow,
  Header,
  Modal,
} from 'semantic-ui-react';
import CollectionPuzzleStatus from '../../../dataTypes/CollectionPuzzleStatus';
import CollectionPuzzleDto from '../../../dataTypes/postDtoTypes/CollectionPuzzleDto';
import { PuzzleScores } from '../../../enums/PuzzleScores';

import './AddToCollectionModal.styles.css';

interface AddToCollectionModalProps {
  onClose: () => void;
  onOpen: () => void;
  onSuccess: () => void;
  open: boolean;
  trigger: {};
  puzzleId: string;
  userName: string;
  solutionUnlocked: boolean;
}

const AddToCollectionModal = (props: AddToCollectionModalProps) => {
  const { onClose, onOpen, onSuccess, open, trigger } = props;

  const [{ data: getData, loading: getLoading, error: getError }] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getStatuses',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/puzzle/add/${props.puzzleId}`,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [isSubmitDisabled, setIsSubmitDisabled] = useState({
    actionCount: 0,
    value: true,
  });
  const [scoreInputValue, setScoreInputValue] = useState('');
  const [statusInputValue, setStatusInputValue] = useState('');
  const [statuses, setStatuses] = useState({
    puzzleStatuses: [] as CollectionPuzzleStatus[],
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });
  const [postErrorMessage, setPostErrorMessage] = useState('');

  useEffect(() => {
    setStatuses({
      ...statuses,
      loading: true,
    });

    if (getData) {
      setStatuses({
        ...statuses,
        puzzleStatuses: getData,
        loading: getLoading,
      });
    } else {
      setStatuses({
        ...statuses,
        error: getError,
        loading: getLoading,
      });
    }
  }, [getData, getLoading, getError]);

  //Use effect which triggers submit button enabling (actions - interaction with required fields)
  useEffect(() => {
    if (isSubmitDisabled.actionCount > 0)
      statusInputValue !== ''
        ? setIsSubmitDisabled({
            ...isSubmitDisabled,
            value: false,
          })
        : setIsSubmitDisabled({
            ...isSubmitDisabled,
            value: true,
          });
  }, [scoreInputValue, statusInputValue]);

  useEffect(() => {
    setPostErrorMessage(postError?.response?.data);
  }, [postError]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    const response = await executePost({
      data: {
        username: props.userName,
        status: statusInputValue,
        //@ts-ignore
        score: scoreInputValue.slice(0, 2).trim() as number,
        solutionUnlocked: props.solutionUnlocked,
      } as CollectionPuzzleDto,
    });

    if (response.status === 201) {
      onSuccess();
      onModalClose();
    }
  };

  const handleStatusItemClick = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownItemProps
  ): void => {
    //@ts-ignore
    setStatusInputValue(data.value);
    setIsSubmitDisabled({
      ...isSubmitDisabled,
      actionCount: isSubmitDisabled.actionCount + 1,
    });
  };

  const handleScoreItemClick = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownItemProps
  ): void => {
    //@ts-ignore
    setScoreInputValue(data.value);
  };

  const onModalClose = () => {
    setStatusInputValue('');
    setScoreInputValue('');
    setIsSubmitDisabled({
      actionCount: 0,
      value: true,
    });
    setPostErrorMessage('');
    onClose();
  };

  return (
    <Container>
      <Modal
        as={Form}
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
          <Container textAlign='center'>Add puzzle to collection</Container>
        </Modal.Header>
        <Modal.Content>
          <Grid columns='2'>
            <GridRow key={'modal_statusesDropdown'} centered>
              <Grid.Column width='4'>
                <Header as={'h5'}>{'Status (Required)'}</Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Dropdown
                  placeholder='Select status'
                  className='selection'
                  loading={statuses.loading}
                  value={statusInputValue}
                  text={statusInputValue}
                >
                  <Dropdown.Menu>
                    {statuses.puzzleStatuses.map(
                      (obj: CollectionPuzzleStatus) => {
                        return (
                          <Dropdown.Item
                            key={obj.status}
                            text={obj.status}
                            value={obj.status}
                            onClick={handleStatusItemClick}
                          ></Dropdown.Item>
                        );
                      }
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                {
                  //TODO error handling component
                  postErrorMessage === 'Status is required' && (
                    <Container textAlign='center'>
                      <Header as='h5' className='error'>
                        {postError?.response?.data}
                      </Header>
                    </Container>
                  )
                }
              </Grid.Column>
            </GridRow>

            <GridRow key={'modal_scoresDropdown'} centered>
              <Grid.Column width='4'>
                <Header as={'h5'}>Score</Header>
              </Grid.Column>
              <Grid.Column width='5'>
                <Dropdown
                  className='selection'
                  placeholder='Select score'
                  value={scoreInputValue}
                  text={scoreInputValue}
                >
                  <Dropdown.Menu>
                    {Object.values(PuzzleScores).map((score) => {
                      return (
                        <Dropdown.Item
                          key={score}
                          text={score}
                          value={score}
                          onClick={handleScoreItemClick}
                        ></Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
            </GridRow>
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
              postErrorMessage ===
                'User collection already contains this puzzle' && (
                <Container textAlign='center'>
                  <Header as='h5' className='error'>
                    {postError?.response?.data}
                  </Header>
                </Container>
              )
            }
            <GridRow key={'modal_submitButtons'} centered>
              <Button size='mini' onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                size='mini'
                disabled={isSubmitDisabled.value}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </GridRow>
          </Grid>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default AddToCollectionModal;
