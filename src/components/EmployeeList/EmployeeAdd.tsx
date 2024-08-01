/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';
import { Employee } from './EmployeeSpecificModal.tsx';
import { modalContentStyles, containerStyles, titleStyles, valueStyles } from './EmployeeSpecificModal.tsx';
import BankSelectComponent from './bankSelect.tsx';
import DaysOfWeek from './DaysOfWeek.tsx';
import WorkTimePicker from './WorkTimePicker.tsx';

const inputStyles = css`
  ${valueStyles}
  padding: 5px;
  border: none;
  border-bottom: 2px solid #d9d9d9;

  &:focus {
    border-bottom-color: var(--primary-blue);
    outline: none;
  }

  &::placeholder {
    ${valueStyles}
  }
`;

const ButtonStyles = css`
  display: flex;
  justify-content: flex-end;
  grid-column: span 2;
  margin-bottom: 10px;
`;

const modaltitleStyles = css`
  font-weight: var(--font-weight-bold);
  color: var(--text-gray);
  grid-column: span 2;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

interface EmployeeAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

const EmployeeAddModal: React.FC<EmployeeAddModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: '',
    name: '',
    phone: '',
    workHours: '',
    account: '',
    salary: ''
  });

  const [workHours, setWorkHours] = useState<string | null>(null);

  useEffect(() => {
    const time = newEmployee.workHours.split(' ')[1] || '';
    setWorkHours(time);
  }, [newEmployee.workHours]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleTimeChange = (value: string | null) => {
    if (value) {
      setWorkHours(value);
    }
  };

  const handleDayClick = (updatedDays: string) => {
    setNewEmployee({ ...newEmployee, workHours: `${updatedDays} ${workHours ?? ''}`.trim() });
  };

  const handleSave = () => {
    const days = newEmployee.workHours.split(' ')[0].split(',').filter(Boolean).sort().join(',');
    onSave({ ...newEmployee, workHours: `${days} ${workHours ?? ''}`.trim() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyles}>
        <div css={[containerStyles, { paddingTop: '20px' }]}>
          <h3 css={modaltitleStyles}>직원 추가</h3>
          <div>
            <div css={titleStyles}>이름</div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={newEmployee.name}
              onChange={handleChange}
              css={inputStyles}
            />
          </div>
          <div>
            <div css={titleStyles}>연락처</div>
            <input
              type="text"
              name="phone"
              placeholder="-없이 입력"
              value={newEmployee.phone}
              onChange={handleChange}
              css={inputStyles}
            />
          </div>
          <div>
            <div css={titleStyles}>계좌 번호</div>
            <div css={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <BankSelectComponent />
              <input
                type="text"
                name="account"
                placeholder="-없이 입력"
                value={newEmployee.account}
                onChange={handleChange}
                css={inputStyles}
              />
            </div>
          </div>
          <div>
            <div css={titleStyles}>기본 급여</div>
            <input
              type="text"
              name="salary"
              placeholder="숫자만 입력"
              value={newEmployee.salary}
              onChange={handleChange}
              css={inputStyles}
            />
            <span css={[valueStyles, { marginLeft: '6px' }]}>원</span>
          </div>
          <div css={{ gridColumn: 'span 2' }}>
            <div css={titleStyles}>근무 시간</div>
            <div css={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <DaysOfWeek workHours={newEmployee.workHours} onDayClick={handleDayClick} editable={true} />
              <WorkTimePicker
                value={workHours}
                onChange={handleTimeChange}
              />
              <div css={valueStyles}>~</div>
              <WorkTimePicker
                value={workHours}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <div css={ButtonStyles}>
            <Button onClick={handleSave}>저장</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeAddModal;
