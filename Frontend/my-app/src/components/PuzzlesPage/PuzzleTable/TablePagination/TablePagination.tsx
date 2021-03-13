import React from 'react';
import { Pagination, Icon, PaginationProps } from 'semantic-ui-react';

interface TablePagination {
  defaultActivePage: number;
  totalPages: number;
  activePage: number;
  onPageChange: (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageInfo: PaginationProps
  ) => void;
}

const TablePagination = (props: TablePagination) => {
  const { totalPages, defaultActivePage, activePage, onPageChange } = props;

  return (
    <>
      <Pagination
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
        onPageChange={onPageChange}
        activePage={activePage}
      />
    </>
  );
};

export default TablePagination;
