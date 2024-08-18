/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

const dayStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid var(--text-white-gray);
  border-radius: var(--border-radius-large);
  font-size: var(--font-size-h5);
  color: var(--text-light-gray);
`;

const clickableStyles = css`
  cursor: pointer;
`;

const selectedDayStyles = css`
  border-color: var(--primary-blue);
  color: var(--primary-blue);
`;

interface DaysOfWeekProps {
  workDay: string | string[];
  onDayClick?: (day: string) => void;
  editable?: boolean; // 편집 가능 여부
}

const extractWorkDays = (workDay: string | string[]) => {
  const workDaysArray = Array.isArray(workDay) ? workDay : [workDay];
  const daysArray: string[] = [];

  workDaysArray.forEach((day) => {
    const matches = day.match(/[월화수목금토일]/g);
    if (matches) {
      daysArray.push(...matches);
    }
  });

  return daysArray.filter(Boolean);
};

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ workDay, onDayClick, editable = false }) => {
  const initialSelectedDays = extractWorkDays(workDay);
  const [selectedDays, setSelectedDays] = useState<string[]>(initialSelectedDays);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    setSelectedDays(extractWorkDays(workDay));
  }, [workDay]);

  const handleDayClick = (day: string) => {
    if (editable) {
      let updatedDays: string[] = [];
      if (selectedDays.includes(day)) {
        updatedDays = selectedDays.filter((d) => d !== day);
      } else {
        updatedDays = [...selectedDays, day];
      }
      updatedDays.sort();
      setSelectedDays(updatedDays);
      onDayClick?.(updatedDays.join(''));
    }
  };

  return (
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div css={{ display: 'flex', gap: '8px' }}>
        {days.map((day) => (
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
