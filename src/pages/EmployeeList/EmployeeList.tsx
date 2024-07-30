/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../../Components/Button.tsx';
import EmployeeSpecificModal, { Employee } from './EmployeeSpecificModal.tsx';
import EmployeeAddModal from './EmployeeAdd.tsx';

const employeeData = [
  { id: '1', name: '김수민', phone: '010-1234-1234', workHours: '월~수 17:00~21:00', account: '국민  123456715679813', salary: '300,000' },
  { id: '2', name: '임효정', phone: '010-1234-1234', workHours: '월~금 08:00~12:00', account: '하나  123456715679813', salary: '300,000' },
  { id: '3', name: '양해석', phone: '010-1234-1234', workHours: '토 10:00~19:00', account: '카카오뱅크  123456715679813', salary: '300,000' },
  { id: '4', name: '김승민', phone: '010-1234-1234', workHours: '일 10:00~19:00', account: '토스뱅크  123456715679813', salary: '300,000' },
];

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

const tableContainerStyles = css`
  width: 90%;
  margin: 30px auto;
  border-radius: var(--border-radius-large);
  padding: 20px;
  box-shadow: var(--shadow-default);
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

const EmployeeList: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSaveEmployee = (employee: Employee) => {
    employeeData.push(employee);
    setIsAddModalOpen(false);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsAddModalOpen(false);
  };

  return (
    <div css={parentStyles}>
      <div css={headerSectionStyles}>
        <h3 css={{ fontWeight: 'bold', color: 'var(--text-gray)' }}>직원 리스트</h3>
        <div css={{ display: 'flex', gap: '20px' }}>
          <Button variant="secondary" onClick={() => console.log('직원 삭제 클릭됨')}>직원 삭제</Button>
          <Button customWidth="50px" customFontSize="40px" onClick={() => setIsAddModalOpen(true)}>+</Button>
        </div>
      </div>
      <div css={tableContainerStyles}>
        <table css={{ width: '100%' }}>
          <thead>
            <tr>
              <th css={[thStyles, { paddingLeft: '60px' }]}>이름</th>
              <th css={thStyles}>연락처</th>
              <th css={thStyles}>근무시간</th>
              <th css={thStyles}>계좌</th>
              <th css={thStyles}>급여</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id} onClick={() => handleRowClick(employee)} css={{ cursor: 'pointer' }}>
                <td css={[tdStyles, { paddingLeft: '60px' }]}>{employee.name}</td>
                <td css={tdStyles}>{employee.phone}</td>
                <td css={tdStyles}>{employee.workHours}</td>
                <td css={tdStyles}>{employee.account}</td>
                <td css={[tdStyles, { color: 'var(--primary-blue)' }]}>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {selectedEmployee && (
          <EmployeeSpecificModal
            isOpen={!!selectedEmployee}
            onClose={closeModal}
            employee={selectedEmployee}
          />
        )}
        {isAddModalOpen && (
          <EmployeeAddModal
            isOpen={isAddModalOpen}
            onClose={closeModal}
            onSave={handleSaveEmployee}
          />
        )}
      </div>
  );
};

export default EmployeeList;