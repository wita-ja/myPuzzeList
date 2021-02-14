import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Image, Header, Pagination, Segment } from 'semantic-ui-react';
import Puzzle from '../../../dataTypes/Puzzle';

interface PuzzleTableProps {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  puzzles: Puzzle[];
}

//TODO See why table is not sortable
//TODO Improve Table.footer to disable buttons, show next batch of puzzles
//TODO See if it's posible to generate HeaderCells from enum
const PuzzleTable = (props: PuzzleTableProps) => {
  return (
    <>
      <Table celled sortable>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Difficulty</Table.HeaderCell>
            <Table.HeaderCell>Avg Rating</Table.HeaderCell>
            <Table.HeaderCell>Your Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.puzzles.map((puzzle) => {
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
                  <Table.Cell>{puzzle.avgScore || 'N/A'}</Table.Cell>
                  <Table.Cell>{puzzle.userScore || 'N/A'}</Table.Cell>
                </Table.Row>
              )
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Segment textAlign='center' basic>
                <Pagination
                  defaultActivePage={1}
                  totalPages={props.totalPages}
                ></Pagination>
              </Segment>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default PuzzleTable;
