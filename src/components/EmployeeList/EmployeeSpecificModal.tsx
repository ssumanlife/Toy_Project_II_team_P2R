/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';
import EmployeeScheduleRequests from '../../Pages/EmployeeList/EmployeeScheduleRequests.tsx';
import DaysOfWeek from './DaysOfWeek.tsx';

interface Employee {
  id: string;
  name: string;
  phone: string;
  workHours: string;
  account: string;
  salary: string;
}

export const modalContentStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const containerStyles = css`
  padding-top: 50px;
  margin: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
`;

export const titleStyles = css`
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  color: var(--text-dark-gray);
  margin-bottom: 30px;
`;

export const valueStyles = css`
  color: var(--text-light-gray);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
`;

const ButtonStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 45px;
`;

const EmployeeSpecificModal: React.FC<{ isOpen: boolean; onClose: () => void; employee: Employee }> = ({
  isOpen,
  onClose,
  employee,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyles}>
        <div css={containerStyles}>
          <div>
            <div css={titleStyles}>이름</div>
            <div css={valueStyles}>{employee.name}</div>
          </div>
          <div>
            <div css={titleStyles}>연락처</div>
            <div css={valueStyles}>{employee.phone}</div>
          </div>
          <div>
            <div css={titleStyles}>계좌 번호</div>
            <div css={valueStyles}>{employee.account}</div>
          </div>
          <div>
            <div css={titleStyles}>이달 급여</div>
            <div css={valueStyles}>{employee.salary}원</div>
          </div>
          <div>
            <div css={titleStyles}>근무 시간</div>
            <DaysOfWeek workHours={employee.workHours} />
          </div>
          <div css={[titleStyles, { gridColumn: 'span 2' }]}>
            <div css={titleStyles}>스케줄 정정 요청 내역</div>
            <EmployeeScheduleRequests />
          </div>
        </div>
        <div css={ButtonStyles}>
          <Button onClick={() => console.log('직원 수정 클릭됨')}>직원 수정</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeSpecificModal;
export type { Employee };
