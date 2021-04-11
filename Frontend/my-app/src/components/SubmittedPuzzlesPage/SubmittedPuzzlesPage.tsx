import React from 'react';
import { Container } from 'semantic-ui-react';
import SubmittedPuzzleTable from './SubmittedPuzzleTable';

const SubmittedPuzzlePage = () => {
  return (
    <>
      <Container>
        <div>
          <h1>SubmittedPuzzle List</h1>
        </div>
        <SubmittedPuzzleTable></SubmittedPuzzleTable>
      </Container>
    </>
  );
};

export default SubmittedPuzzlePage;
