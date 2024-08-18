/** @jsxImportSource @emotion/react */
import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ count, page, onChange }) => (
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
        sx={{
          color: 'var(--text-gray)',
          '&.Mui-selected': {
            backgroundColor: 'var(--primary-blue)',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2A63D1',
            },
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
      paddingBottom: '30px',
    }}
  />
);

export default PaginationComponent;
