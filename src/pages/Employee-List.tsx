/** @jsxImportSource @emotion/react */
import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';
// import { Link } from 'react-router-dom';
import Button from '../Components/Button.tsx';
import Modal from '../Components/Modal';
import { EmployeeContext, Employee } from './Employee-Specific';


const parentStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 76px);;
  margin-top: 76px;
  background-color: var(--background-main);
`;

const headerSectionStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  top: 0px;
  padding: 40px 20px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const titleStyles = css`
  font-weight: bold;
  color: var(--text-gray);
`;

const buttonContainerStyles = css`
  display: flex;
  gap: 20px;

`;

const tableContainerStyles = css`
  width: 90%;
  margin: 30px auto;
  border-radius: var(--border-radius-large);
  padding: 20px;
  box-shadow: var(--shadow-default);
`;

const tableStyles = css`
  width: 100%;
`;

const thStyles = css`
  text-align: left;
  font-weight: bold;
  padding-bottom: 20px;
  color: var(--text-gray);
`;

const tdStyles = css`
  border-top: 1px solid #e0e0e0;
  height: 140px;
  vertical-align: middle; /* 세로 가운데 정렬 */
  color: var(--text-gray);
`;

const amountStyles = css`
  color: var(--primary-blue);
`;

const EmployeeList: React.FC = () => {
  const employees = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div css={parentStyles}>
      <div css={headerSectionStyles}>
        <h3 css={titleStyles}>직원 리스트</h3>
        <div css={buttonContainerStyles}>
          <Button variant="secondary" onClick={() => console.log('직원 삭제 클릭됨')}>직원 삭제</Button>
          <Button customWidth="50px" customFontSize="40px" onClick={() => console.log('직원 추가 클릭됨')}>+</Button>
        </div>
      </div>
      <div css={tableContainerStyles}>
        <table css={tableStyles}>
          <thead>
            <tr>
              <th css={thStyles}>이름</th>
              <th css={thStyles}>연락처</th>
              <th css={thStyles}>근무시간</th>
              <th css={thStyles}>계좌</th>
              <th css={thStyles}>급여</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} onClick={() => handleRowClick(employee)} css={{ cursor: 'pointer' }}>
                <td css={tdStyles}>{employee.name}</td>
                <td css={tdStyles}>{employee.phone}</td>
                <td css={tdStyles}>{employee.workHours}</td>
                <td css={tdStyles}>{employee.account}</td>
                <td css={[tdStyles, amountStyles]}>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <Modal isOpen={!!selectedEmployee} onClose={closeModal}>
          <div>이름: {selectedEmployee.name}</div>
          <div>연락처: {selectedEmployee.phone}</div>
          <div>근무시간: {selectedEmployee.workHours}</div>
          <div>계좌: {selectedEmployee.account}</div>
          <div>급여: {selectedEmployee.salary}</div>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeList;