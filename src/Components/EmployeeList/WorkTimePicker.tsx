/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import Select from '../Select';

// Select 커스텀 코드
const CustomSelect = styled(Select)`
  width: 130px;
  color: var(--text-light-gray);
`;

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      options.push(label);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

interface WorkTimePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const WorkTimePicker: React.FC<WorkTimePickerProps> = ({ value, onChange }) => {
  const handleSelect = (option: string) => {
    onChange(option);
  };

  return (
    <CustomSelect
      options={timeOptions}
      defaultLabel={value || '시간 선택'}
      onSelect={handleSelect}
    />
  );
};

export default WorkTimePicker;
