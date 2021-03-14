import React from 'react';
import { Container } from 'semantic-ui-react';
import PuzzleTable from './PuzzleTable';

const PuzzlesPage = () => {
  return (
    <>
      <Container>
        <div>
          <h1>Puzzle List</h1>
        </div>
        <PuzzleTable></PuzzleTable>
      </Container>
    </>
  );
};

export default PuzzlesPage;
