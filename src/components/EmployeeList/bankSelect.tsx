/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Select from '../Select'; 


const BankSelectComponent: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState('은행 선택');

  const handleSelect = (option: string) => {
    setSelectedBank(option);
  };

  return (
    <Select
      options={['국민', '농협', '하나', '카카오뱅크']}
      defaultLabel={selectedBank}
      onSelect={handleSelect}
    />
  );
};

export default BankSelectComponent;
