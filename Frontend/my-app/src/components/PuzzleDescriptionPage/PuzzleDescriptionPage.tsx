import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Image,
  Divider,
  Header,
  Container,
  Loader,
  GridColumn,
  Button,
} from 'semantic-ui-react';
import PuzzleDescription from '../../dataTypes/PuzzleDescription';
import '../PuzzleDescriptionPage/PuzzleDescriptionPage.styles.css';
import AddToCollectionModal from './AddToCollectionModal';

interface ParamTypes {
  puzzleId: string;
}

function PuzzleDescriptionPage(props: { username: string; isLogged: boolean }) {
  let { puzzleId } = useParams<ParamTypes>();
  const [
    { data: getPuzzleData, loading: getPuzzleLoading, error: getPuzzleError },
  ] = useAxios({
    url: `http://localhost:8080/api/puzzle/${puzzleId}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    {
      data: getListValidationData,
      loading: getListValidationLoading,
      error: getListValidationError,
    },
    executeValidation,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/validate/collection/${puzzleId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [state, setState] = useState(getPuzzleData as PuzzleDescription);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  //TODO implement solution viewing
  const [isSolutionUnlocked, setSolutionUnlocked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (getPuzzleData) {
      setState({
        ...state,
        ...getPuzzleData,
      });
    }
    setIsLoading(getPuzzleLoading);
  }, [getPuzzleData]);

  useEffect(() => {
    if (showToast === true) {
      notify();
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [showToast]);

  useEffect(() => {
    if (props.isLogged) {
      executeValidation();

      setIsLoading(true);
      setIsAdded(getListValidationData);

      setTimeout(() => {
        setIsLoading(getListValidationLoading);
      }, 500);
    }
  }, [getListValidationData]);

  const notify = () => {
    toast.success('Puzzle successfully added to your collection!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  if ((getPuzzleError && isLoading) || getPuzzleError) {
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
  if (isLoading) return <Loader active></Loader>;
  //TODO Implement error page component

  return (
    <Container>
      <ToastContainer position='top-center' autoClose={3000} />
      <>
        <Grid padded='vertically' columns='2'>
          <Grid.Column width='4'>
            <Image
              alt={state.title} //TODO probably need to change to proper one title != image name
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
                      {state[el.toLocaleLowerCase() as keyof PuzzleDescription]}
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
                    {isAdded ? (
                      <Button disabled>Already added to collection</Button>
                    ) : (
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
              Puzzle solution - TODO
            </Header>
            <p>You didn't buy this puzzle solution yet</p>
            <Button>Buy puzzle solution</Button>
          </>
        )}
      </>
    </Container>
  );
}

const puzzleInfoLabels = ['Type', 'Difficulty', 'Brand'];
export default PuzzleDescriptionPage;
