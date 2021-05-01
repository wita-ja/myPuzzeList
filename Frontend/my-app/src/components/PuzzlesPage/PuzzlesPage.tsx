import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Input,
} from 'semantic-ui-react';
import PuzzleTable from './PuzzleTable';
import SubmitPuzzleModal from './SubmitPuzzleModal';

import './PuzzlePage.styles.css';

const PuzzlesPage = (props: { isLogged: boolean }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast === true) {
      notify();
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [showToast]);

  const notify = () => {
    toast.success('Puzzle successfully submitted for review!', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} />
      <Container>
        <Grid columns={2}>
          <GridRow className='firstLessPadded'>
            <GridColumn>
              <h1>Puzzle List</h1>
            </GridColumn>
            <GridColumn></GridColumn>
          </GridRow>
          <GridRow className='lessPadded'>
            <GridColumn>
              {props.isLogged && (
                <SubmitPuzzleModal
                  open={showModal}
                  onOpen={() => setShowModal(true)}
                  onClose={() => setShowModal(false)}
                  onSuccess={() => setShowToast(true)}
                  trigger={<Button floated='left'>Submit puzzle</Button>}
                ></SubmitPuzzleModal>
              )}
            </GridColumn>
            <GridColumn textAlign='right'>
              <Input
                className='search'
                action={<Button primary>Search</Button>}
                placeholder='Search...'
              />
            </GridColumn>
          </GridRow>
        </Grid>
        <PuzzleTable></PuzzleTable>
      </Container>
    </>
  );
};

export default PuzzlesPage;
