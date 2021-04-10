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
import { PuzzleScores } from '../../../enums/PuzzleScores';
import './EditCollectionModal.styles.css';

interface EditCollectionModalProps {
  onClose: () => void;
  onOpen: () => void;
  onSuccess: () => void;
  open: boolean;
  trigger: {};
  puzzleId: string;
  userName: string;
}

const EditCollectionModal = (props: EditCollectionModalProps) => {
  const { onClose, onOpen, onSuccess, open, trigger } = props;

  const [{ data: getData, loading: getLoading, error: getError }] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getStatuses',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  //TODO pakeisti i put
  /*  const [
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
  ); */

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

  // TODO update to putError
  /*  useEffect(() => {
    setPutErrorMessage(postError?.response?.data);
  }, [postError]); */

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = { status: 200 };
    /*   TODO update to putError
    const response = await executePost({
      data: {
        username: props.userName,
        status: statusInputValue,
        //@ts-ignore
        score: scoreInputValue.slice(0, 2).trim() as number,
        solutionUnlocked: props.solutionUnlocked,
      } as CollectionPuzzleDto,
    }); 
 */
    if (response.status === 200) {
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
    //TODO update with manual api call
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
            /* (postErrorMessage?.error === 'Internal Server Error' ||
                //@ts-ignore
                postErrorMessage?.error === 'Bad Request') && (
                <Container textAlign='center'>
                  <Header as='h5' className='error'>
                    {postError?.response?.data.error}
                  </Header>
                </Container>
              ) */
          }
          <GridRow key={'modal_submitButtons'}>
            <Grid.Column width='3' floated='right'>
              <Button size='mini' onClick={handleDeleteButtonClick}>
                Delete puzzle
              </Button>
            </Grid.Column>
            <Grid.Column width='6' floated='right'>
              <Button size='mini' onClick={handleSubmit}>
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
