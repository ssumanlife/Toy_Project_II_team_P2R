/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { valueStyles } from '../Pages/EmployeeList/EmployeeSpecificModal';

interface DaysOfWeekProps {
  workHours: string;
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

const selectedDayStyles = css`
  ${dayStyles};
  border-color: var(--primary-blue);
  color: var(--primary-blue);
`;

const extractWorkDaysAndTime = (workHours: string) => {
  const [days, time] = workHours.split(' ');
  const daysArray = days.split('~');
  const allDays = ['월', '화', '수', '목', '금', '토', '일'];
  if (daysArray.length === 2) {
    const startIndex = allDays.indexOf(daysArray[0]);
    const endIndex = allDays.indexOf(daysArray[1]);
    return {
      days: allDays.slice(startIndex, endIndex + 1),
      time,
    };
  }
  return { days: [days], time };
};

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ workHours }) => {
  const { days: selectedDays, time } = extractWorkDaysAndTime(workHours);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <div css={{ display: 'flex', gap: '8px' }}>
        {days.map(day => (
          <span key={day} css={selectedDays.includes(day) ? selectedDayStyles : dayStyles}>
            {day}
          </span>
        ))}
      </div>
      <div css={[valueStyles, { marginLeft: '25px'}]}>{time}</div> {/* 시간을 따로 표시 */}
    </div>
  );
};

export default DaysOfWeek;