/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Select from '../Select';

// Select 커스텀 코드
const CustomSelect = styled(Select)`
  width: 130px;
  color: var(--text-light-gray);
`;

const generateTimeOptions = () =>
  Array.from({ length: 24 }, (_, hour) =>
    ['00', '30'].map((minute) => `${String(hour).padStart(2, '0')}:${minute}`),
  ).flat();

const timeOptions = generateTimeOptions();

interface WorkTimePickerProps {
  value: string | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | null) => void;
}

const WorkTimePicker: React.FC<WorkTimePickerProps> = ({ value, onChange }) => {
  const handleSelect = (option: string) => {
    onChange(option);
  };

  return <CustomSelect options={timeOptions} defaultLabel={value || '시간 선택'} onSelect={handleSelect} />;
};

export default WorkTimePicker;
