/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Modal from '../../Components/Modal.tsx';
import Button from '../../Components/Button.tsx';
import { Employee } from './EmployeeSpecificModal.tsx';
import { modalContentStyles, containerStyles, titleStyles, valueStyles } from './EmployeeSpecificModal.tsx';
import SelectComponent from '../../Components/bankSelect.tsx';

const inputStyles = css`
  ${valueStyles}
  padding: 5px;
  border: none;
  border-bottom: 2px solid #d9d9d9;

  &:focus {
    border-bottom-color: var(--primary-blue);
    outline: none;
  }
`;

const ButtonStyles = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSave = () => {
    onSave(newEmployee);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyles}>
        <div css={containerStyles}>
          <h3 css={modaltitleStyles}>직원 리스트</h3>
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
            <SelectComponent/>
            <input
              type="text"
              name="account"
              placeholder="-없이 입력"
              value={newEmployee.account}
              onChange={handleChange}
              css={inputStyles}
            />
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
          <div>
            <div css={titleStyles}>근무 시간</div>
            <input
              type="text"
              name="workHours"
              placeholder="근무시간"
              value={newEmployee.workHours}
              onChange={handleChange}
              css={inputStyles}
            />
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
