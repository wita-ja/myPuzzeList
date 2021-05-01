import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  Header,
  Loader,
  Container,
  Grid,
  Divider,
  GridColumn,
  Button,
  Image,
  Confirm,
  ConfirmProps,
} from 'semantic-ui-react';
import SubmittedPuzzleVisibility from '../../dataTypes/postDtoTypes/SubmittedPuzzleVisibilityDto';
import SubmittedPuzzle from '../../dataTypes/SubmittedPuzzle';

interface ParamTypes {
  puzzleId: string;
}

export const SubmittedPuzzleDescriptionPage = (props: {
  isLogged: boolean;
}) => {
  let { puzzleId } = useParams<ParamTypes>();
  let history = useHistory();

  const [
    { data: getPuzzleData, loading: getPuzzleLoading, error: getPuzzleError },
  ] = useAxios({
    url: `http://localhost:8080/api/puzzle/submitted/${puzzleId}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    { data: putData, loading: putLoading, error: putError },
    executePut,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/puzzle/submitted/${puzzleId}/changeVisibility`,
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [state, setState] = useState(getPuzzleData as SubmittedPuzzle);
  const [isLoading, setIsLoading] = useState(true);
  const [showApproveToast, setShowApproveToast] = useState(false);
  const [showRejectToast, setShowRejectToast] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

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
    if (showApproveToast === true) {
      notifyApprove();
      setTimeout(() => setShowApproveToast(false), 3500);
      setTimeout(() => history.push('/submittedPuzzles/1'), 3600);
    } else if (showRejectToast === true) {
      notifyReject();
      setTimeout(() => setShowRejectToast(false), 3500);
      setTimeout(() => history.push('/submittedPuzzles/1'), 3600);
    }
  }, [showApproveToast, showRejectToast]);

  const notifyApprove = () => {
    toast.success('Puzzle successfully approved!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const notifyReject = () => {
    toast.success('Puzzle successfully rejected!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  const handlePuzzleApprove = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ) => {
    const response = await executePut({
      data: {
        approved: true,
        rejected: false,
      } as SubmittedPuzzleVisibility,
    });

    if (response.status === 200) {
      setShowApproveToast(true);
      setShowApproveConfirm(false);
    }
  };

  const handlePuzzleReject = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ) => {
    const response = await executePut({
      data: {
        approved: false,
        rejected: true,
      } as SubmittedPuzzleVisibility,
    });
    console.log(response);
    if (response.status === 200) {
      setShowRejectToast(true);
      setShowRejectConfirm(false);
    }
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
                      {state[el.toLocaleLowerCase() as keyof SubmittedPuzzle]}
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
                <GridColumn>{state.materials.join(', ')}</GridColumn>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>

        <Header as='h3' dividing>
          Puzzle description
        </Header>
        <p>{state.description}</p>
      </>

      <Confirm
        open={showApproveConfirm}
        content='Are you sure you want to approve submitted puzzle?'
        trigger={
          <Button floated='right' onClick={() => setShowApproveConfirm(true)}>
            Approve
          </Button>
        }
        onCancel={() => setShowApproveConfirm(false)}
        onConfirm={handlePuzzleApprove}
        confirmButton='Confirm'
        size='mini'
      ></Confirm>
      <Confirm
        open={showRejectConfirm}
        content='Are you sure you want to reject submitted puzzle?'
        trigger={
          <Button floated='right' onClick={() => setShowRejectConfirm(true)}>
            Reject
          </Button>
        }
        onCancel={() => setShowRejectConfirm(false)}
        onConfirm={handlePuzzleReject}
        confirmButton='Confirm'
        size='mini'
      ></Confirm>
    </Container>
  );
};

const puzzleInfoLabels = ['Type', 'Difficulty', 'Brand'];
export default SubmittedPuzzleDescriptionPage;
