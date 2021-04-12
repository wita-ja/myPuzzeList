import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Button,
  Container,
  Grid,
  GridColumn,
  GridRow,
} from 'semantic-ui-react';
import PuzzleTable from './PuzzleTable';
import SubmitPuzzleModal from './SubmitPuzzleModal';

const PuzzlesPage = () => {
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
          <GridRow>
            <GridColumn>
              <h1>Puzzle List</h1>
            </GridColumn>
            <GridColumn>
              <SubmitPuzzleModal
                open={showModal}
                onOpen={() => setShowModal(true)}
                onClose={() => setShowModal(false)}
                onSuccess={() => setShowToast(true)}
                trigger={<Button floated={'right'}>Submit puzzle</Button>}
              ></SubmitPuzzleModal>
            </GridColumn>
          </GridRow>
        </Grid>
        <PuzzleTable></PuzzleTable>
      </Container>
    </>
  );
};

export default PuzzlesPage;
