/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const scheduleRequests = [
  {
    date: '7월 16일',
    previousTime: '07:00 ~ 14:00',
    newTime: '07:00 ~ 15:00',
    change: '+ 1시간',
    amount: '10,000원',
  },
];

interface ScheduleRequest {
  date: string;
  previousTime: string;
  newTime: string;
  change: string;
  amount: string;
}

interface EmployeeScheduleRequestsProps {
  requests?: ScheduleRequest[];
}

const containerStyles = css`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-h4);
  border-top: var(--border-default) #e0e0e0;
  font-weight: var(--font-weight-regular);
`;

const requestStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 20px 60px 0 0;
`;

const EmployeeScheduleRequests: React.FC<EmployeeScheduleRequestsProps> = ({ requests = scheduleRequests }) => (
  <div css={containerStyles}>
    {requests.map((request, index) => (
      <div key={index} css={requestStyles}>
        <div>{request.date}</div>
        <div css={{ display: 'flex', gap: '40px' }}>
          <div>{request.previousTime}</div>→<div>{request.newTime}</div>
        </div>
        <div css={{ color: '#FF7676', fontWeight: 'var(--font-weight-bold)' }}>{request.change}</div>
        <div css={{ color: 'var(--text-blue)' }}>{request.amount}</div>
      </div>
    ))}
  </div>
);

export default EmployeeScheduleRequests;
