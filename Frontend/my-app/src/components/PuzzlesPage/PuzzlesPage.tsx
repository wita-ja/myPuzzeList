import React from 'react';
import puzzles from '../../assets/mockedData/Puzzles.data';
import PuzzleTable from './PuzzleTable';

interface PuzzlePageProps {
  pageSize: number;
  currentPage?: number;
}

//TODO see if it's possible to update currentPage from PuzzleTable, maybe move it to PuzzleTable
//TODO Fetch initial puzzles from api
const PuzzlesPage = (props: PuzzlePageProps) => {
  const calculateTotalPages = (pageSize: number) => {
    const numberOfPuzzles = puzzles.filter((puzzle) => {
      return puzzle.approved;
    }).length;

    const totalPages = Math.ceil(numberOfPuzzles / pageSize);
    return totalPages;
  };

  return (
    <>
      <div>
        <h1>Puzzle List</h1>
      </div>
      <PuzzleTable
        pageSize={props.pageSize}
        currentPage={1}
        totalPages={calculateTotalPages(props.pageSize)}
        puzzles={puzzles}
      ></PuzzleTable>
    </>
  );
};

export default PuzzlesPage;
