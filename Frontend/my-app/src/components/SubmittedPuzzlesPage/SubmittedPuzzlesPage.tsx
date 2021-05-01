import React from 'react';
import { Container, Grid, GridColumn, GridRow, Input } from 'semantic-ui-react';
import SubmittedPuzzleTable from './SubmittedPuzzleTable';

const SubmittedPuzzlePage = () => {
  return (
    <>
      <Container>
        <div>
          <h1>SubmittedPuzzle List</h1>
        </div>
        <Grid columns='1'>
          <GridRow>
            <GridColumn textAlign='right'>
              <Input size='small' className='search' placeholder='Search...' />
            </GridColumn>
          </GridRow>
        </Grid>
        <SubmittedPuzzleTable></SubmittedPuzzleTable>
      </Container>
    </>
  );
};

export default SubmittedPuzzlePage;
