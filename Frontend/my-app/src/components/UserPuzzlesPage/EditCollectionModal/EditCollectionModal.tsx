import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonProps,
  Confirm,
  ConfirmProps,
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
import './EditCollectionModal.styles.css';

interface EditCollectionModalProps {
  onClose: () => void;
  onOpen: () => void;
  onUpdateToast: () => void;
  onDeleteToast: () => void;
  open: boolean;
  trigger: {};
  puzzleId: string;
  username: string;
}

const EditCollectionModal = (props: EditCollectionModalProps) => {
  const {
    onClose,
    onOpen,
    onUpdateToast,
    onDeleteToast,
    open,
    trigger,
  } = props;

  const [{ data: getData, loading: getLoading, error: getError }] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getStatuses',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    {
      data: getUserPuzzleData,
      loading: getUserPuzzleLoading,
      error: getUserPuzzleError,
    },
  ] = useAxios({
    url: `http://localhost:8080/api/user/${props.username}/collection/${props.puzzleId}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    { data: putData, loading: putLoading, error: putError },
    executePut,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/collection/edit/${props.puzzleId}`,
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [
    {
      data: deletePuzzleData,
      loading: deletePuzzleLoading,
      error: deletePuzzleError,
    },
    executeDelete,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/collection/delete/${props.puzzleId}`,
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [scoreInputValue, setScoreInputValue] = useState('');
  const [statusInputValue, setStatusInputValue] = useState('');
  const [statuses, setStatuses] = useState({
    puzzleStatuses: [] as CollectionPuzzleStatus[],
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });
  const [putErrorMessage, setPutErrorMessage] = useState('');
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

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

  useEffect(() => {
    setPutErrorMessage(putError?.response?.data);
  }, [putError]);

  useEffect(() => {
    if (getUserPuzzleData) {
      Object.values(PuzzleScores).forEach((el) => {
        if (+el.slice(0, 2).trim() === getUserPuzzleData.score) {
          setScoreInputValue(el);
        }
      });
      setStatusInputValue(getUserPuzzleData.status);
    }

    setTimeout(() => {
      return;
    }, 250);
  }, [getUserPuzzleData]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await executePut({
      data: {
        username: props.username,
        status: statusInputValue,
        //@ts-ignore
        score: scoreInputValue.slice(0, 2).trim() as number,
      } as CollectionPuzzleDto,
    });

    if (response.status === 200) {
      onUpdateToast();
      onModalClose();
    }
  };

  const handleStatusItemClick = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownItemProps
  ): void => {
    //@ts-ignore
    setStatusInputValue(data.value);
  };

  const handleScoreItemClick = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownItemProps
  ): void => {
    //@ts-ignore
    setScoreInputValue(data.value);
  };

  const handleDeleteButtonClick = (
    event: React.SyntheticEvent<HTMLElement>,
    data: ButtonProps
  ): void => {
    setShowConfirmationMessage(true);
  };

  const handlePuzzleDelete = (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ): void => {
    console.log(`Deleted puzzle: ${props.puzzleId}`);
    executeDelete();
    onDeleteToast();
    onModalClose();
  };

  const onModalOpen = () => {
    console.log(`puzzleId: ${props.puzzleId}`);
    onOpen();
  };

  const onModalClose = () => {
    setShowConfirmationMessage(false);
    setStatusInputValue('');
    setScoreInputValue('');
    setPutErrorMessage('');
    onClose();
  };

  return (
    <Modal
      as={Form}
      open={open}
      onClose={onModalClose}
      onOpen={onModalOpen}
      trigger={trigger}
      size='small'
      closeOnEscape
      closeOnDimmerClick={false}
      closeIcon
    >
      <Modal.Header>
        <Container textAlign='center'>Edit collection puzzle</Container>
      </Modal.Header>
      <Modal.Content>
        <Grid columns='2'>
          <GridRow key={'modal_statusesDropdown'} centered>
            <Grid.Column width='4'>
              <Header as={'h5'}>Status</Header>
            </Grid.Column>
            <Grid.Column width='5'>
              <Dropdown
                placeholder='Select status'
                className='selection'
                loading={statuses.loading}
                value={statusInputValue}
                text={statusInputValue}
                defaultValue={statusInputValue}
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
                defaultValue={scoreInputValue}
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
            //@ts-ignore
            (putErrorMessage?.error === 'Internal Server Error' ||
              //@ts-ignore
              putErrorMessage?.error === 'Bad Request') && (
              <Container textAlign='center'>
                <Header as='h5' className='error'>
                  {putError?.response?.data.error}
                </Header>
              </Container>
            )
          }
          <GridRow key={'modal_submitButtons'}>
            <Grid.Column width='6' floated='right'>
              <Button size='mini' onClick={handleDeleteButtonClick} negative>
                Delete puzzle
              </Button>
            </Grid.Column>
            <Grid.Column width='6' floated='left'>
              <Button size='mini' onClick={handleSubmit} primary>
                Submit
              </Button>
            </Grid.Column>
          </GridRow>
        </Grid>

        <Confirm
          open={showConfirmationMessage}
          content='Are you sure you want to delete puzzle from your collection?'
          onCancel={() => setShowConfirmationMessage(false)}
          onConfirm={handlePuzzleDelete}
          confirmButton='Confirm'
          size='mini'
        ></Confirm>
      </Modal.Content>
    </Modal>
  );
};

export default EditCollectionModal;
