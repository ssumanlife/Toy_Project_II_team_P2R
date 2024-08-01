/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Select from '../Select'; 

const customSelectStyles = css`
  width: 130px; /* 원하는 너비로 설정 */
  color: var(--text-light-gray);
`;


const BankSelectComponent: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState('은행 선택');

  const handleSelect = (option: string) => {
    setSelectedBank(option);
  };

  return (
    <Select
      css={customSelectStyles}
      options={['국민', '농협', '하나', '카카오뱅크']}
      defaultLabel={selectedBank}
      onSelect={handleSelect}
    />
  );
};

export default BankSelectComponent;
