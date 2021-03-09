import React, { useEffect } from 'react';
import puzzles from '../../assets/mockedData/Puzzles.data';
import PuzzleTable from './PuzzleTable';
import useAxios from 'axios-hooks';

interface PuzzlePageProps {
  pageSize: number;
  currentPage?: number;
}

//TODO see if it's possible to update currentPage from PuzzleTable, maybe move it to PuzzleTable
//TODO Fetch initial puzzles from api
const PuzzlesPage = (props: PuzzlePageProps) => {
  const [{ data, loading, error }] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getAll',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const calculateTotalPages = (pageSize: number) => {
    const numberOfPuzzles = puzzles.filter((puzzle) => {
      return puzzle.approved;
    }).length;

    const totalPages = Math.ceil(numberOfPuzzles / pageSize);
    return totalPages;
  };

  //TODO normaliai ideti loaderi ir error'a i visa list'a
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>{error.response?.data}</p>;
  }

  return (
    <>
      <div>
        <h1>Puzzle List</h1>
      </div>
      <PuzzleTable
        pageSize={props.pageSize}
        currentPage={1}
        totalPages={calculateTotalPages(props.pageSize)}
        puzzles={data}
      ></PuzzleTable>
    </>
  );
};

export default PuzzlesPage;
