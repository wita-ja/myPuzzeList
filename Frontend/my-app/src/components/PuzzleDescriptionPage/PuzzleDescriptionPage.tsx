import useAxios from 'axios-hooks';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Segment,
  Image,
  Divider,
  Header,
  Container,
  Loader,
  GridColumn,
  Button,
  List,
  Confirm,
  ConfirmProps,
} from 'semantic-ui-react';
import PuzzleDescription from '../../dataTypes/PuzzleDescription';
import { PuzzleSolutionStep } from '../../dataTypes/PuzzleSolutionStep';
import '../PuzzleDescriptionPage/PuzzleDescriptionPage.styles.css';
import AddToCollectionModal from './AddToCollectionModal';

interface ParamTypes {
  puzzleId: string;
}

function PuzzleDescriptionPage(props: { username: string; isLogged: boolean }) {
  let { puzzleId } = useParams<ParamTypes>();
  const [
    { data: getPuzzleData, loading: getPuzzleLoading, error: getPuzzleError },
  ] = useAxios(
    {
      url: `http://localhost:8080/api/puzzle/${puzzleId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { useCache: false }
  );

  const [
    {
      data: getListValidationData,
      loading: getListValidationLoading,
      error: getListValidationError,
    },
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/validate/collection/${puzzleId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { useCache: false }
  );

  const [
    {
      data: getSolutionStatusData,
      loading: getSolutionStatusLoading,
      error: getSolutionStatusError,
    },
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/validate/collection/${puzzleId}/isSolutionUnlocked`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { useCache: false }
  );

  const [state, setState] = useState({} as PuzzleDescription);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [allowToAdd, setAllowToAdd] = useState(false);
  const [isSolutionUnlocked, setSolutionUnlocked] = useState(false);
  const [showSolutionUnlockConfirm, setShowSolutionUnlockConfirm] = useState(
    false
  );

  useEffect(() => {
    if (!isUndefined(getPuzzleData as PuzzleDescription)) {
      setState({
        ...state,
        ...getPuzzleData,
      });
      console.log('Oke');
    } else {
      setState({
        ...state,
      });
      console.log('bad');
    }
  }, [getPuzzleData]);

  useEffect(() => {
    if (showToast === true) {
      setAllowToAdd(false);
      notify();
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [showToast]);

  useEffect(() => {
    if (props.isLogged) {
      setAllowToAdd(!getListValidationData);
    }
  }, [getListValidationData]);

  useEffect(() => {
    setSolutionUnlocked(getSolutionStatusData);
  }, [getSolutionStatusData]);

  const notify = () => {
    toast.success('Puzzle successfully added to your collection!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const handleSolutionUnlocking = (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ) => {
    //TODO proper api call for puzzle solution unlock
    setShowSolutionUnlockConfirm(false);
  };

  if ((getPuzzleError && getPuzzleLoading) || getPuzzleError) {
    console.log(getPuzzleError.response?.data);
    return (
      <>
        <Header
          textAlign='center'
          size='huge'
          color='red'
        >{`${getPuzzleError.response?.data.error} \n ${getPuzzleError.response?.data.status}`}</Header>
      </>
    );
  }
  if (getListValidationLoading || getPuzzleLoading || getSolutionStatusLoading)
    return <Loader active></Loader>;
  //TODO Implement error page component

  return (
    <Container>
      <ToastContainer position='top-center' autoClose={3000} />
      <>
        <Grid padded='vertically' columns='2'>
          <Grid.Column width='4'>
            <Image
              alt={state.title}
              src={state.imagePath[0] || 'images/NoImageAvailable.jpg'}
              size='medium'
              centered
            ></Image>
          </Grid.Column>
          <Grid.Column width='6'>
            <Header as='h2'>{state.title}</Header>
            <Divider fitted></Divider>
            <Header className='PuzzleInfo' size='medium'>
              Puzzle information
            </Header>
            <Grid padded='horizontally' columns='2'>
              {puzzleInfoLabels.map((el: String) => {
                //TODO Simonas Komponentas ane? :D
                return (
                  <Grid.Row>
                    <Grid.Column
                      className='infoLabel'
                      width='3'
                      color='grey'
                      textAlign='left'
                    >
                      {el}
                    </Grid.Column>

                    <GridColumn>
                      {state[
                        el.toLocaleLowerCase() as keyof PuzzleDescription
                      ] || 'No information'}
                    </GridColumn>
                  </Grid.Row>
                );
              })}
              <Grid.Row>
                <Grid.Column
                  className='infoLabel'
                  width='3'
                  color='grey'
                  textAlign='left'
                >
                  Materials
                </Grid.Column>
                <GridColumn>{state.material.join(', ')}</GridColumn>
              </Grid.Row>
              <Grid.Row>
                {props.isLogged && (
                  <>
                    {allowToAdd ? (
                      <AddToCollectionModal
                        open={showModal}
                        onOpen={() => setShowModal(true)}
                        onClose={() => setShowModal(false)}
                        onSuccess={() => setShowToast(true)}
                        trigger={<Button>Add to collection</Button>}
                        puzzleId={puzzleId}
                        userName={props.username}
                        solutionUnlocked={isSolutionUnlocked}
                      ></AddToCollectionModal>
                    ) : (
                      <Button disabled>Already added to collection</Button>
                    )}
                  </>
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>

        <Header as='h3' dividing>
          Puzzle description
        </Header>
        <p>{state.description}</p>
        {props.isLogged && (
          <>
            <Header as='h3' dividing>
              Puzzle solution
            </Header>
            {isSolutionUnlocked && (
              <>
                <List>
                  <List.Content>
                    {state.solutionDetails.map(
                      (solution: PuzzleSolutionStep, index) => {
                        return (
                          <List.Item>
                            <p>{solution.stepDescription}</p>

                            <Image
                              alt={state.title}
                              src={
                                solution.stepImagePath ||
                                'images/NoImageAvailable.jpg'
                              }
                              size={index == 1 ? 'small' : 'medium'}
                            ></Image>
                          </List.Item>
                        );
                      }
                    )}
                  </List.Content>
                </List>
              </>
            )}

            {isSolutionUnlocked || (
              <>
                <p>Solution is not unlocked</p>
                <Confirm
                  open={showSolutionUnlockConfirm}
                  content='Are you sure you want to unlock puzzle for x Activity points?'
                  trigger={
                    <Button
                      floated='left'
                      onClick={() => setShowSolutionUnlockConfirm(true)}
                    >
                      Unlock Solution
                    </Button>
                  }
                  onCancel={() => setShowSolutionUnlockConfirm(false)}
                  onConfirm={handleSolutionUnlocking}
                  confirmButton='Confirm'
                  size='mini'
                ></Confirm>
              </>
            )}
          </>
        )}
      </>
    </Container>
  );
}

const puzzleInfoLabels = ['Type', 'Difficulty', 'Brand'];
export default PuzzleDescriptionPage;
