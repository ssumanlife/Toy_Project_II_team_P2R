/** @jsxImportSource @emotion/react */
import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

interface Employee {
  id: string;
  name: string;
  phone: string;
  workHours: string;
  account: string;
  salary: string;
}

const employeeData = [
  { id: '1', name: '김수민', phone: '010-1234-1234', workHours: '월~수 17:00~21:00', account: '국민 123456715679813', salary: '300,000' },
  { id: '2', name: '임효정', phone: '010-1234-1234', workHours: '월~금 08:00~12:00', account: '하나 123456715679813', salary: '300,000' },
  { id: '3', name: '양해석', phone: '010-1234-1234', workHours: '토요일 10:00~19:00', account: '카카오뱅크 123456715679813', salary: '300,000' },
  { id: '4', name: '김승민', phone: '010-1234-1234', workHours: '토요일 10:00~19:00', account: '토스뱅크 123456715679813', salary: '300,000' },
];

const EmployeeContext = createContext(employeeData);

const containerStyles = css`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 20px;
`;

const detailItemStyles = css`
  margin-bottom: 10px;
`;

const EmployeeSpecific: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employees = useContext(EmployeeContext);
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return <div>직원 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div css={containerStyles}>
      <h2>{employee.name}의 상세 정보</h2>
      <div css={detailItemStyles}>이름: {employee.name}</div>
      <div css={detailItemStyles}>연락처: {employee.phone}</div>
      <div css={detailItemStyles}>근무시간: {employee.workHours}</div>
      <div css={detailItemStyles}>계좌: {employee.account}</div>
      <div css={detailItemStyles}>급여: {employee.salary}</div>
    </div>
  );
};

export { EmployeeContext };
export default EmployeeSpecific;
export type { Employee };