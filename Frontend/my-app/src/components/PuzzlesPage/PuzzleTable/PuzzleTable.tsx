import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Image, Header, Segment } from 'semantic-ui-react';
import Puzzle from '../../../dataTypes/Puzzle';
import _ from 'lodash';
import TablePagination from './TablePagination';

interface PuzzleTableProps {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  puzzles: Puzzle[];
  direction?: 'ascending' | 'descending';
}

//TODO Enable pagination and rendering only max page size
//TODO Improve Table.footer to disable buttons, show next batch of puzzles
//TODO See if it's posible to generate HeaderCells from enum
const PuzzleTable = (props: PuzzleTableProps) => {
  const [state, setState] = useState({
    column: '',
    puzzles: props.puzzles,
    direction: props.direction, // will be undefined if not set as props in parent component
  });

  const handleSort = (clickedColumn: string) => () => {
    if (state.column !== clickedColumn) {
      const key = clickedColumn as keyof typeof state.puzzles[0]; //TODO ask Simonas how to do it properly
      const nums = state.puzzles
        .filter(function (el) {
          return typeof el[key] === 'number';
        })
        .sort();

      const strings = state.puzzles
        .filter(function (el) {
          return typeof el[key] === 'string';
        })
        .sort();

      setState({
        column: clickedColumn,
        puzzles: _.sortBy(nums.concat(strings), [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    setState({
      ...state,
      puzzles: state.puzzles.reverse(),
      direction: state.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  return (
    <>
      <Table celled sortable>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === 'title' ? state.direction : undefined}
              onClick={handleSort('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                state.column === 'difficulty' ? state.direction : undefined
              }
              onClick={handleSort('difficulty')}
            >
              Difficulty
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === 'avgScore' ? state.direction : undefined}
              onClick={handleSort('avgScore')}
            >
              Avg Rating
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                state.column === 'userScore' ? state.direction : undefined
              }
              onClick={handleSort('userScore')}
            >
              Your Score
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {state.puzzles.map((puzzle) => {
            return (
              puzzle.approved && (
                <Table.Row key={puzzle.id} textAlign='center'>
                  <Table.Cell>
                    <Image
                      alt={puzzle.title}
                      src={process.env.PUBLIC_URL + puzzle.imagePath}
                      size='mini'
                      centered
                    ></Image>
                  </Table.Cell>
                  <Table.Cell>
                    <Header
                      as={Link}
                      to={`/puzzle/${puzzle.id}`}
                      floated='left'
                      textAlign='left'
                      size='small'
                      color='blue'
                    >
                      {puzzle.title}
                      <Header.Subheader>{puzzle.description}</Header.Subheader>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{puzzle.difficulty}</Table.Cell>
                  <Table.Cell>{puzzle.avgScore}</Table.Cell>
                  <Table.Cell>{puzzle.userScore}</Table.Cell>
                </Table.Row>
              )
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Segment textAlign='center' basic>
                <TablePagination
                  defaultActivePage={1}
                  totalPages={props.totalPages}
                ></TablePagination>
              </Segment>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default PuzzleTable;
