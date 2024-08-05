/** @jsxImportSource @emotion/react */
import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      size="medium"
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            color: 'var(--text-gray)',
            '&.Mui-selected': {
              backgroundColor: 'var(--primary-blue)',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2A63D1',
              }
            },
            '&.MuiPaginationItem-ellipsis': {
              color: 'var(--primary-blue)',
            },
          }}
        />
      )}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '30px'
      }}
    />
  );
};

export default PaginationComponent;