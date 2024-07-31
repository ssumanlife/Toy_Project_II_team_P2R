/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

interface DaysOfWeekProps {
  workHours: string;
  onDayClick?: (day: string) => void;
  editable?: boolean; // 편집 가능 여부
}

const dayStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--text-white-gray);
  border-radius: var(--border-radius-large);
  font-size: var(--font-size-h4);
  color: var(--text-light-gray);
`;

const clickableStyles = css`
  cursor: pointer;
`;

const selectedDayStyles = css`
  border-color: var(--primary-blue);
  color: var(--primary-blue);
`;

const extractWorkDays = (workHours: string) => {
  const [days] = workHours.split(' ');
  const daysArray = days.split(',');
  return daysArray.filter(Boolean);
};

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ workHours, onDayClick, editable = false }) => {
  const initialSelectedDays = extractWorkDays(workHours);
  const [selectedDays, setSelectedDays] = useState<string[]>(initialSelectedDays);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    setSelectedDays(initialSelectedDays);
  }, [workHours]);

  const handleDayClick = (day: string) => {
    if (editable) {
      let updatedDays: string[] = [];
      if (selectedDays.includes(day)) {
        updatedDays = selectedDays.filter(d => d !== day);
      } else {
        updatedDays = [...selectedDays, day];
      }
      updatedDays.sort();
      setSelectedDays(updatedDays);
      onDayClick?.(updatedDays.join(','));
    }
  };

  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <div css={{ display: 'flex', gap: '8px' }}>
        {days.map(day => (
          <span 
            key={day} 
            css={[dayStyles, selectedDays.includes(day) && selectedDayStyles, editable && clickableStyles]} 
            onClick={() => handleDayClick(day)}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DaysOfWeek;