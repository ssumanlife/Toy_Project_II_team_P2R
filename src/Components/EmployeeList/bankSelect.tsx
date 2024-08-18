/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Select from '../Select';

const customSelectStyles = css`
  width: 130px; /* 원하는 너비로 설정 */
  color: var(--text-light-gray);
`;

interface BankSelectComponentProps {
  selectedBank: string;
  onChange: (bank: string) => void;
}

const BankSelectComponent: React.FC<BankSelectComponentProps> = ({ selectedBank, onChange }) => {
  const handleSelect = (option: string) => {
    onChange(option);
  };

  return (
    <Select
      css={customSelectStyles}
      options={['국민은행', '농협은행', '하나은행', '신한은행', '카카오뱅크', '토스뱅크']}
      defaultLabel={selectedBank || '은행 선택'}
      onSelect={handleSelect}
    />
  );
};

export default BankSelectComponent;
