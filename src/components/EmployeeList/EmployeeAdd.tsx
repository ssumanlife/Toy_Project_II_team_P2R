/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';
import { Employee } from './EmployeeSpecificModal.tsx';
import { modalContentStyles, containerStyles, titleStyles } from './EmployeeSpecificModal.tsx';
import BankSelectComponent from './bankSelect.tsx';
import DaysOfWeek from './DaysOfWeek.tsx';
import WorkTimePicker from './WorkTimePicker.tsx';
import { addEmployee } from '../../API/Firebase/AddEmployeeList.ts';

const valueStyles = css`
  color: var(--text-light-gray);
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
`;

export const inputStyles = css`
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

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
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

const AddButton = css`
  margin-left: 10px;
  font-size: var(--font-size-h2);
  cursor: pointer;
  background: none;
  border: none;
  color: var(--text-light-gray);
  margin-bottom: 13px;

  &:hover {
    color: var(--primary-blue);
  }
`;

interface EmployeeAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

const EmployeeAddModal: React.FC<EmployeeAddModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    employeeId: '',
    name: '',
    phoneNumber: '',
    workDay: '',
    accountNumber: '',
    baseSalary: '',
  });

  const [selectedBank, setSelectedBank] = useState<string>('');
  const [workSchedules, setWorkSchedules] = useState<{ days: string; start: string | null; end: string | null }[]>([
    { days: '', start: null, end: null },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddSchedule = () => {
    setWorkSchedules([...workSchedules, { days: '', start: null, end: null }]);
  };

  const handleDayClick = (index: number, updatedDays: string) => {
    const newSchedules = [...workSchedules];
    newSchedules[index].days = updatedDays;
    setWorkSchedules(newSchedules);
  };

  const handleTimeChange = (index: number, type: 'start' | 'end', value: string | null) => {
    const newSchedules = [...workSchedules];
    newSchedules[index][type] = value;
    setWorkSchedules(newSchedules);
  };

  const handleBankChange = (bank: string) => {
    setSelectedBank(bank);
  };

  const handleSave = async () => {
    const workDayString = workSchedules
      .filter((schedule) => schedule.days && schedule.start && schedule.end)
      .map((schedule) => `${schedule.days} ${schedule.start}~${schedule.end}`)
      .join(', ');

    const employeeToSave = { ...newEmployee, workDay: workDayString };

    try {
      await addEmployee(employeeToSave);
      onSave(employeeToSave);
    } catch (error) {
      console.error('Failed to save employee', error);
    }

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
              type="number"
              name="phoneNumber"
              placeholder="-없이 입력"
              value={newEmployee.phoneNumber}
              onChange={handleChange}
              css={inputStyles}
            />
          </div>
          <div>
            <div css={titleStyles}>계좌 번호</div>
            <div css={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <BankSelectComponent selectedBank={selectedBank} onChange={handleBankChange} />
              <input
                type="number"
                name="accountNumber"
                placeholder="-없이 입력"
                value={newEmployee.accountNumber}
                onChange={handleChange}
                css={inputStyles}
              />
            </div>
          </div>
          <div>
            <div css={titleStyles}>기본 급여</div>
            <input
              type="number"
              name="baseSalary"
              placeholder="숫자만 입력"
              value={newEmployee.baseSalary}
              onChange={handleChange}
              css={inputStyles}
            />
            <span css={[valueStyles, { marginLeft: '6px' }]}>원</span>
          </div>
          {workSchedules.map((schedule, index) => (
            <div css={{ gridColumn: 'span 2' }} key={index}>
              <div css={{ display: 'flex', alignItems: 'center' }}>
                <div css={titleStyles}>근무 시간 {index + 1}</div>
                <button css={AddButton} onClick={handleAddSchedule}>
                  +
                </button>
              </div>
              <div css={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <DaysOfWeek
                  workDay={schedule.days}
                  onDayClick={(days) => handleDayClick(index, days)}
                  editable={true}
                />
                <WorkTimePicker value={schedule.start} onChange={(time) => handleTimeChange(index, 'start', time)} />
                <div css={valueStyles}>~</div>
                <WorkTimePicker value={schedule.end} onChange={(time) => handleTimeChange(index, 'end', time)} />
              </div>
            </div>
          ))}

          <div css={ButtonStyles}>
            <Button onClick={handleSave}>저장</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeAddModal;
