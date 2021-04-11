import { AxiosError } from 'axios';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  PaginationProps,
  Header,
  Container,
  Loader,
  Table,
  Segment,
  Image,
  Grid,
  GridColumn,
  GridRow,
  Checkbox,
} from 'semantic-ui-react';
import SubmittedPuzzle from '../../../dataTypes/SubmittedPuzzle';
import TablePagination from '../../CommonComponents/TablePagination';

const SubmittedPuzzleTable = () => {
  const [state, setState] = useState({
    pageSize: 0,
    totalPages: 0,
    activePage: 1,
    column: 'rejected', // kurio column headeri spaude
    submittedPuzzles: [] as SubmittedPuzzle[],
    direction: 'ascending',
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });

  const [{ data, loading, error }] = useAxios(
    {
      url: 'http://localhost:8080/api/puzzle/getAllSubmitted',
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
        submittedPuzzles: data.content,
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
    history.push(`/submittedPuzzles/${state.activePage}`);
  }, [state.activePage]);

  const handleSort = (clickedColumn: string) => () => {
    if (state.column !== clickedColumn) {
      setState({
        ...state,
        column: clickedColumn,
        submittedPuzzles: _.sortBy(state.submittedPuzzles, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    setState({
      ...state,
      submittedPuzzles: state.submittedPuzzles.reverse(),
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
                      ? (state.direction as 'ascending' | 'descending')
                      : undefined
                  }
                  onClick={handleSort('title')}
                >
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={
                    state.column === 'rejected'
                      ? (state.direction as 'ascending' | 'descending')
                      : undefined
                  }
                  onClick={handleSort('rejected')}
                >
                  Rejected
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.submittedPuzzles.map(
                (submittedPuzzle: SubmittedPuzzle) => {
                  return (
                    <Table.Row key={submittedPuzzle.id} textAlign='center'>
                      <Table.Cell>
                        <Image
                          alt={submittedPuzzle.title} //TODO probably need to change to proper one title != image name
                          src={
                            submittedPuzzle.imagePath[0] ||
                            'images/NoImageAvailable.jpg'
                          }
                          size='tiny'
                          centered
                        ></Image>
                      </Table.Cell>
                      <Table.Cell width='6'>
                        <Header
                          as={Link}
                          to={`/submittedPuzzle/${submittedPuzzle.id}`}
                          floated='left'
                          textAlign='left'
                          size='small'
                          color='blue'
                        >
                          {submittedPuzzle.title}
                          <Header.Subheader>
                            {
                              submittedPuzzle.description /* TODO Egle kaip slepia overflow characteriu (css text-overflow*/
                            }
                          </Header.Subheader>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          defaultChecked={submittedPuzzle.rejected}
                        ></Checkbox>
                      </Table.Cell>
                    </Table.Row>
                  );
                }
              )}
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

export default SubmittedPuzzleTable;
