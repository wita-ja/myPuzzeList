import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Header,
  Segment,
  PaginationProps,
  Container,
  Loader,
  Button,
  Icon,
} from 'semantic-ui-react';
import CollectionPuzzle from '../../../dataTypes/CollectionPuzzle';
import TablePagination from '../../CommonComponents/TablePagination';

const UserPuzzlesTable = (props: { username: string }) => {
  const [state, setState] = useState({
    pageSize: 0,
    totalPages: 0,
    activePage: 1,
    column: 'title', // kurio column headeri spaude
    puzzles: [] as CollectionPuzzle[],
    direction: 'ascending',
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined, // see if needed
  });

  //TODO add puzzle fetch from api and use effect
  const [{ data, loading, error }] = useAxios(
    {
      url: `http://localhost:8080/api/user/${props.username}/collection`,
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

  return (
    <>
      {state.loading ? (
        <Container className='loader_container'>
          <Loader active className='loader_table'></Loader>
        </Container>
      ) : (
        <Table celled sortable>
          <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell>No</Table.HeaderCell>
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
                  state.column === 'score'
                    ? (state.direction as 'ascending' | 'descending')
                    : undefined
                }
                onClick={handleSort('score')}
              >
                Score
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={
                  state.column === 'status'
                    ? (state.direction as 'ascending' | 'descending')
                    : undefined
                }
                onClick={handleSort('avgSstatuscore')}
              >
                Status
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.puzzles.map((puzzle: CollectionPuzzle, index: number) => {
              return (
                <Table.Row key={puzzle.id} textAlign='center'>
                  <Table.Cell>
                    {index + 2 * (state.activePage - 1) + 1}
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
                  <Table.Cell>{puzzle.userScore || 'N/A'}</Table.Cell>
                  <Table.Cell>{puzzle.status || 'N/A'}</Table.Cell>
                  <Table.Cell>
                    <Button
                      as={Link}
                      to={`/user/${props.username}/collection/${puzzle.id}`}
                      icon
                      basic
                    >
                      <Button.Content visible>
                        <Icon name='edit'></Icon>
                      </Button.Content>
                    </Button>
                  </Table.Cell>
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
      )}
    </>
  );
};

export default UserPuzzlesTable;
