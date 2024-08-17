/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';
import { Employee, modalContentStyles, containerStyles, titleStyles } from './EmployeeSpecificModal.tsx';
import BankSelectComponent from './bankSelect.tsx';
import DaysOfWeek from './DaysOfWeek.tsx';
import WorkTimePicker from './WorkTimePicker.tsx';

const valueStyles = css`
  color: var(--text-light-gray);
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
`;

const errorStyles = css`
  color: red;
  font-size: 14px;
  margin-top: 4px;
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
  // eslint-disable-next-line no-unused-vars
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
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
    if (bank) {
      setErrors((prevErrors) => ({ ...prevErrors, bankName: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newEmployee.name) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (newEmployee.name.length < 2) {
      newErrors.name = '이름은 최소 2글자 이상이어야 합니다.';
    }
    if (!newEmployee.phoneNumber) {
      newErrors.phoneNumber = '연락처를 입력해주세요.';
    } else if (!/^\d{8}$/.test(newEmployee.phoneNumber)) {
      newErrors.phoneNumber = '연락처는 8자리 숫자여야 합니다.';
    }
    if (!selectedBank) newErrors.bankName = '은행을 선택해주세요.';

    if (!newEmployee.accountNumber) {
      newErrors.accountNumber = '계좌 번호를 입력해주세요.';
    } else if (newEmployee.accountNumber.length < 10) {
      newErrors.accountNumber = '올바른 계좌번호를 입력해주세요.';
    }

    if (!newEmployee.baseSalary) newErrors.baseSalary = '기본 급여를 입력해주세요.';

    workSchedules.forEach((schedule, index) => {
      if (!schedule.days) newErrors[`workDay${index}`] = '근무 요일을 선택해주세요.';
      if (!schedule.start || !schedule.end) newErrors[`workTime${index}`] = '시간을 선택해주세요.';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const workDayString = workSchedules
      .filter((schedule) => schedule.days && schedule.start && schedule.end)
      .map((schedule) => `${schedule.days} ${schedule.start}~${schedule.end}`)
      .join(' ');

    const fullAccountNumber = `${selectedBank} ${newEmployee.accountNumber}`;
    const employeeToSave = { ...newEmployee, workDay: workDayString, accountNumber: fullAccountNumber };

    try {
      toast.success(`${newEmployee.name}님이 추가되었습니다!`, {
        autoClose: 1000,
        onClose: () => {
          onSave(employeeToSave);
          onClose();
        },
      });
    } catch (error) {
      console.warn('Failed to save employee', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyles}>
        <ToastContainer position="bottom-center" style={{ zIndex: 9999 }} />
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
            {errors.name && <div css={errorStyles}>{errors.name}</div>}
          </div>
          <div>
            <div css={titleStyles}>연락처</div>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <p css={[inputStyles, { width: 'auto', marginRight: '8px', padding: '0', border: 'none' }]}>010 - </p>
              <input
                type="number"
                name="phoneNumber"
                placeholder="숫자만 입력"
                value={newEmployee.phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value.length > 8) {
                    e.target.value = e.target.value.slice(0, 8);
                  }
                }}
                css={inputStyles}
              />
            </div>
            {errors.phoneNumber && <div css={errorStyles}>{errors.phoneNumber}</div>}
          </div>
          <div>
            <div css={titleStyles}>계좌 번호</div>
            <div css={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <BankSelectComponent selectedBank={selectedBank} onChange={handleBankChange} />
                {errors.bankName && <div css={errorStyles}>{errors.bankName}</div>}
              </div>
              <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="숫자만 입력"
                  value={newEmployee.accountNumber}
                  onChange={handleChange}
                  css={inputStyles}
                />
                {errors.accountNumber && <div css={errorStyles}>{errors.accountNumber}</div>}
              </div>
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
            {errors.baseSalary && <div css={errorStyles}>{errors.baseSalary}</div>}
          </div>
          {workSchedules.map((schedule, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div css={{ gridColumn: 'span 2' }} key={index}>
              <div css={{ display: 'flex', alignItems: 'center' }}>
                <div css={titleStyles}>근무 시간 {index + 1}</div>
                <button css={AddButton} onClick={handleAddSchedule}>
                  +
                </button>
              </div>
              <div css={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative' }}>
                <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                  <DaysOfWeek workDay={schedule.days} onDayClick={(days) => handleDayClick(index, days)} editable />
                  {errors[`workDay${index}`] && (
                    <div css={[errorStyles, { position: 'absolute', top: '100%', left: '0' }]}>
                      {errors[`workDay${index}`]}
                    </div>
                  )}
                </div>
                <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                  <WorkTimePicker value={schedule.start} onChange={(time) => handleTimeChange(index, 'start', time)} />
                  {errors[`workTime${index}`] && (
                    <div css={[errorStyles, { position: 'absolute', top: '100%', left: '0' }]}>
                      {errors[`workTime${index}`]}
                    </div>
                  )}
                </div>
                <div css={{ display: 'flex', alignItems: 'center' }}>
                  <div css={valueStyles}>~</div>
                </div>
                <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <WorkTimePicker value={schedule.end} onChange={(time) => handleTimeChange(index, 'end', time)} />
                </div>
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
