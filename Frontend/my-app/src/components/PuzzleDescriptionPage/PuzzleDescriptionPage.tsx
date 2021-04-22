import useAxios from 'axios-hooks';
import { isEmpty, isNull, isUndefined } from 'lodash';
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
    executeGetListValidationData,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/validate/collection/${puzzleId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { useCache: false, manual: true }
  );

  const [
    {
      data: getSolutionStatusData,
      loading: getSolutionStatusLoading,
      error: getSolutionStatusError,
    },
    executeGetSolutionStatusData,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/validate/collection/${puzzleId}/isSolutionUnlocked`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { useCache: false, manual: true }
  );

  const [
    {
      data: postUnlockSolutionData,
      loading: postUnlockSolutionLoading,
      error: postUnlockSolutionError,
    },
    executeUnlockPuzzle,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/collection/unlockSolution/${puzzleId}`,
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true, useCache: false }
  );

  const [state, setState] = useState({} as PuzzleDescription);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [allowToAdd, setAllowToAdd] = useState(false);
  const [isSolutionUnlocked, setSolutionUnlocked] = useState(false);
  const [showSolutionUnlockConfirm, setShowSolutionUnlockConfirm] = useState(
    false
  );
  const [isSolutionExist, setSolutionExist] = useState(false);

  useEffect(() => {
    if (!isUndefined(getPuzzleData as PuzzleDescription)) {
      setState({
        ...state,
        ...getPuzzleData,
      });

      if (getPuzzleData.solutionCost > 0) {
        setSolutionExist(true);
      } else setSolutionExist(false);

      console.log('Oke');
    } else {
      console.log('bad');
    }
  }, [getPuzzleData]);

  useEffect(() => {
    if (showToast === true && isSolutionUnlocked === true) {
      notifyUnlockSuccesfull();
      setTimeout(() => setShowToast(false), 3500);
    } else if (showToast === true) {
      setAllowToAdd(false);
      notify();
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [showToast]);

  useEffect(() => {
    if (showSolutionUnlockConfirm === false) {
      setSolutionUnlocked(true);
      notifyUnlockSuccesfull();
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [showSolutionUnlockConfirm]);

  useEffect(() => {
    if (props.isLogged) {
      setAllowToAdd(!getListValidationData);
    }
  }, [getListValidationData]);

  useEffect(() => {
    setSolutionUnlocked(getSolutionStatusData);
  }, [getSolutionStatusData]);

  useEffect(() => {
    if (props.isLogged == true) {
      executeGetSolutionStatusData();
      executeGetListValidationData();
    }
  }, []);

  const notify = () => {
    toast.success('Puzzle successfully added to your collection!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const notifyUnlockSuccesfull = () => {
    toast.success('Puzzle solution was successfully unlocked!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const handleSolutionUnlocking = (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ) => {
    executeUnlockPuzzle({
      data: {
        username: props.username,
        solutionUnlocked: true,
      },
    });
    setSolutionUnlocked(true);

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
  console.log('state:' + JSON.stringify(state));
  if (
    getListValidationLoading ||
    getPuzzleLoading ||
    getSolutionStatusLoading ||
    isUndefined(state) == true ||
    isEmpty(state.imagePath)
  ) {
    return <Loader active></Loader>;
  } else {
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
          {(props.isLogged && isSolutionExist) || (
            <>
              <>
                <Header as='h3' dividing>
                  Puzzle solution
                </Header>
                <p>No infromation about puzzle solution yet</p>
              </>
            </>
          )}

          {props.isLogged && isSolutionExist && (
            <>
              <Header as='h3' dividing>
                Puzzle solution
              </Header>
              {isSolutionUnlocked && (
                <>
                  <List>
                    <List.Content>
                      {state.solutionSteps.map(
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
                  <Confirm
                    open={showSolutionUnlockConfirm}
                    content={`Are you sure that you want to unlock this puzzle solution for ${state.solutionCost} activity points?`}
                    trigger={
                      <Button
                        disabled={allowToAdd}
                        floated='left'
                        onClick={() => setShowSolutionUnlockConfirm(true)}
                      >
                        Unlock puzzle solution
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

  //TODO Implement error page component
}

const puzzleInfoLabels = ['Type', 'Difficulty', 'Brand'];
export default PuzzleDescriptionPage;
