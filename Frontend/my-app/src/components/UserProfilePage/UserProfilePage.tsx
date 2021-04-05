import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import UserDetails from '../../dataTypes/UserDetails';

//TODO fetch info from back
interface RouteParams {
  username: string;
}

//TODO display inside of container on the left
//TODO basic info edit mode
const UserProfilePage = () => {
  let { username } = useParams<RouteParams>();

  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:8080/api/user/${username}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [state, setState] = useState(data as UserDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLabelValues, setProfileLabelValues] = useState({
    Description: '',
    Role: '',
    'Joined on': '',
    'Activity points': 0,
    'Age group': '',
  });

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

  useEffect(() => {
    if (!loading) {
      setProfileLabelValues({
        Description: state.description,
        Role: state.role,
        'Joined on': state.dateCreated.slice(0, state.dateCreated.indexOf(' ')),
        'Activity points': state.activityPoints,
        'Age group': state.ageGroup,
      });
    }
  }, [state]);

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
          <Grid.Column width='6'>
            <Header as={'h2'}>Profile Information</Header>
            <Grid padded='horizontally' columns='2'>
              {Object.keys(profileLabelValues).map(
                (label: any, index: number) => {
                  return (
                    <Grid.Row key={label}>
                      <Grid.Column
                        className='infoLabel'
                        width='5'
                        color='grey'
                        textAlign='left'
                        verticalAlign='middle'
                      >
                        {label}
                      </Grid.Column>
                      <Grid.Column>
                        {Object.values(profileLabelValues)[index]}
                      </Grid.Column>
                    </Grid.Row>
                  );
                }
              )}
            </Grid>
          </Grid.Column>

          <Grid.Column width='6'>
            <Header as={'h2'}>Puzzle Statistics(future)</Header>
          </Grid.Column>
        </Grid>
      </>
    </Container>
  );
};

export default UserProfilePage;
