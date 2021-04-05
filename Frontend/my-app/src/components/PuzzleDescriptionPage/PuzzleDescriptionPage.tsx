import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from 'semantic-ui-react';
import PuzzleDescription from '../../dataTypes/PuzzleDescription';
import '../PuzzleDescriptionPage/PuzzleDescriptionPage.styles.css';

interface ParamTypes {
  puzzleId: string;
}

function PuzzleDescriptionPage() {
  let { puzzleId } = useParams<ParamTypes>();
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:8080/api/puzzle/${puzzleId}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [state, setState] = useState(data as PuzzleDescription);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    if (data) {
      setState({
        ...state,
        ...data,
      });
    }
    setIsLoading(loading);
  }, [data]);

  if ((error && isLoading) || error) {
    console.log(error.response?.data);
    return (
      <>
        <Header
          textAlign='center'
          size='huge'
          color='red'
        >{`${error.response?.data.error} \n ${error.response?.data.status}`}</Header>
      </>
    );
  }
  if (isLoading) return <Loader active></Loader>;
  //TODO Implement error page component

  return (
    <Container>
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
                <Button>Add puzzle to your list //TODO</Button>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>

        <Header as='h3' dividing>
          Puzzle description
        </Header>
        <p>{state.description}</p>
        <Header as='h3' dividing>
          Puzzle solution - TODO
        </Header>
        <p>You didn't buy this puzzle solution yet</p>
        <Button>Buy puzzle solution</Button>
      </>
    </Container>
  );
}

const puzzleInfoLabels = ['Type', 'Difficulty', 'Brand'];
export default PuzzleDescriptionPage;
