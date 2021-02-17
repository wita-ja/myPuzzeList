import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Icon, PaginationProps } from 'semantic-ui-react';

interface TablePagination {
  defaultActivePage: number;
  totalPages: number;
  currentPage?: number; //TODO check if needed later
}

const TablePagination = (props: TablePagination) => {
  const { totalPages, defaultActivePage, currentPage } = props;
  const [state, setState] = useState(props);

  useEffect(() => {
    currentPage
      ? setState({ ...state, currentPage: currentPage })
      : setState({ ...state, currentPage: defaultActivePage });
  }, []);

  const handlePaginationChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageInfo: PaginationProps
  ) => {
    /* setState({
      ...state,
      currentPage: pageInfo.activePage as number,
    }); */
    setState((prevState: TablePagination) => {
      return {
        ...prevState,
        currentPage: pageInfo.activePage,
      } as TablePagination;
    });
    console.log('state after set: ' + state.currentPage);
  };

  return (
    <>
      {console.log('state before link set: ' + state.currentPage)}
      <Link to={`puzzles/${state.currentPage}`}>
        <Pagination
          defaultActivePage={defaultActivePage}
          ellipsisItem={{
            content: <Icon name='ellipsis horizontal' />,
            icon: true,
          }}
          firstItem={{
            content: <Icon name='angle double left' />,
            icon: true,
          }}
          lastItem={{
            content: <Icon name='angle double right' />,
            icon: true,
          }}
          prevItem={{
            content: <Icon name='angle left' />,
            icon: true,
          }}
          nextItem={{
            content: <Icon name='angle right' />,
            icon: true,
          }}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </Link>
    </>
  );
};

export default TablePagination;
