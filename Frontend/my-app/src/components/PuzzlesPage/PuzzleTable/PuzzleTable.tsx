import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Table,
  Image,
  Header,
  Segment,
  Loader,
  PaginationProps,
  Container,
} from 'semantic-ui-react';
import Puzzle from '../../../dataTypes/Puzzle';
import _ from 'lodash';
import TablePagination from '../../CommonComponents/TablePagination';
import useAxios from 'axios-hooks';
import { AxiosError } from 'axios';
import '../PuzzleTable/PuzzleTable.styles.css';

//TODO Improve Table.footer to disable buttons, show next batch of puzzles
const PuzzleTable = () => {
  const [state, setState] = useState({
    pageSize: 0,
    totalPages: 0,
    activePage: 1,
    column: 'title', // kurio column headeri spaude
    puzzles: [] as Puzzle[],
    direction: 'ascending',
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });

  const [{ data, loading, error }] = useAxios(
    {
      url: 'http://localhost:8080/api/puzzle/getAll',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        page: state.activePage,
        sortBy: state.column,
        direction: state.direction === 'ascending' ? 'asc' : 'desc',
      },
    },
    { useCache: false }
  );

  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });

    if (data) {
      setState({
        ...state,
        puzzles: data.content,
        pageSize: data.pageable.pageSize,
        totalPages: data.totalPages,
        loading: loading,
      });
    } else {
      setState({
        ...state,
        error: error,
        loading: loading,
      });
    }
  }, [data, loading, error]);

  let history = useHistory();
  useEffect(() => {
    history.push(`/puzzles/${state.activePage}`);
  }, [state.activePage]);

  const handleSort = (clickedColumn: string) => () => {
    if (state.column !== clickedColumn) {
      setState({
        ...state,
        column: clickedColumn,
        puzzles: _.sortBy(state.puzzles, [clickedColumn]),
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

  const handlePaginationChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageInfo: PaginationProps
  ) => {
    setState({ ...state, activePage: pageInfo.activePage as number });
  };

  //if (state.loading) return <Loader active></Loader>;
  //TODO Implement error page component
  if (state.error) {
    console.log(state.error.response?.data);
    return (
      <>
        <Header
          textAlign='center'
          size='huge'
          color='red'
        >{`${state.error.response?.data.error} \n ${state.error.response?.data.status}`}</Header>
      </>
    );
  }
  //URL Change while navigating between pages
  return (
    <>
      {state.loading ? (
        <Container className='loader_container'>
          <Loader active className='loader_table'></Loader>
        </Container>
      ) : (
        <>
          <Table celled sortable>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === 'title'
                      ? (state.direction as 'ascending' | 'descending') //TODO Simonas
                      : undefined
                  }
                  onClick={handleSort('title')}
                >
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === 'difficulty'
                      ? (state.direction as 'ascending' | 'descending')
                      : undefined
                  }
                  onClick={handleSort('difficulty')}
                >
                  Difficulty
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === 'avgScore'
                      ? (state.direction as 'ascending' | 'descending')
                      : undefined
                  }
                  onClick={handleSort('avgScore')}
                >
                  Avg Rating
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.puzzles.map((puzzle: Puzzle) => {
                return (
                  <Table.Row key={puzzle.id} textAlign='center'>
                    <Table.Cell>
                      <Image
                        alt={puzzle.title} //TODO probably need to change to proper one title != image name
                        src={
                          puzzle.imagePath[0] || 'images/NoImageAvailable.jpg'
                        }
                        size='tiny'
                        centered
                      ></Image>
                    </Table.Cell>
                    <Table.Cell width='6'>
                      <Header
                        as={Link}
                        to={`/puzzle/${puzzle.id}`}
                        floated='left'
                        textAlign='left'
                        size='small'
                        color='blue'
                      >
                        {puzzle.title}
                        <Header.Subheader>
                          {
                            puzzle.description /* TODO Egle kaip slepia overflow characteriu (css text-overflow*/
                          }
                        </Header.Subheader>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{puzzle.difficulty}</Table.Cell>
                    <Table.Cell>{puzzle.avgScore || 'N/A'}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='5'>
                  <Segment textAlign='center' basic>
                    <TablePagination
                      totalPages={state.totalPages}
                      activePage={state.activePage}
                      onPageChange={handlePaginationChange}
                    ></TablePagination>
                  </Segment>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </>
      )}
    </>
  );
};

export default PuzzleTable;
