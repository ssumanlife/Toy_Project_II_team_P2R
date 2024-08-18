/* eslint-disable no-shadow */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';
import EmployeeScheduleRequests from '../../Pages/EmployeeList/EmployeeScheduleRequests.tsx';
import DaysOfWeek from './DaysOfWeek.tsx';
import { inputStyles } from './EmployeeAdd.tsx';
import updateEmployee from '../../API/Firebase/UpdateEmployeeList.ts';
import BankSelectComponent from './bankSelect.tsx';
import WorkTimePicker from './WorkTimePicker.tsx';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string | string[];
  accountNumber: string;
  baseSalary: string;
}

export const modalContentStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 800px;
  height: 500px;
  overflow-y: auto;
`;

export const containerStyles = css`
  padding-top: 50px;
  margin: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export const titleStyles = css`
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-bold);
  color: var(--text-dark-gray);
  margin-bottom: 15px;
`;

export const valueStyles = css`
  color: var(--text-light-gray);
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
`;

const ButtonStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const workTimeStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmployeeSpecificModal: React.FC<{ isOpen: boolean; onClose: () => void; employee: Employee }> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({ ...employee });
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    setUpdatedEmployee({ ...employee });
    const [bank, number] = employee.accountNumber.split(' ');
    setSelectedBank(bank);
    setAccountNumber(number);
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'accountNumber') {
      setAccountNumber(value);
    } else {
      setUpdatedEmployee({ ...updatedEmployee, [name]: value });
    }
  };

  const handleBankChange = (bank: string) => {
    setSelectedBank(bank);
  };

  const handleDayClick = (clickedDay: string, index: number) => {
    const newDaysArray = [clickedDay];

    const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
    const newDays = newDaysArray.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).join('');

    const existingTimeRange = splitWorkDays[index].split(' ')[1] || '';
    const updatedWorkDays = [...splitWorkDays];
    updatedWorkDays[index] = `${newDays} ${existingTimeRange}`.trim();

    setUpdatedEmployee({
      ...updatedEmployee,
      workDay: updatedWorkDays.join(', '),
    });
  };

  const handleSave = async () => {
    const workDayString = updatedEmployee.workDay;

    try {
      await updateEmployee({
        ...updatedEmployee,
        workDay: workDayString,
        accountNumber: `${selectedBank} ${accountNumber}`,
      });

      setEditMode(false);
      onClose();
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.warn('Failed to update employee', error);
    }
  };

  const workDays = Array.isArray(employee.workDay) ? employee.workDay : [employee.workDay];
  const splitWorkDays = workDays.reduce<string[]>((acc, workDay) => acc.concat(workDay.split(',')), []);

  return (
    <Modal key={key} isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyles}>
        <div css={containerStyles}>
          <div>
            <div css={titleStyles}>이름</div>
            {editMode ? (
              <input type="text" name="name" value={updatedEmployee.name} onChange={handleChange} css={inputStyles} />
            ) : (
              <div css={valueStyles}>{updatedEmployee.name}</div>
            )}
          </div>
          <div>
            <div css={titleStyles}>연락처</div>
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={updatedEmployee.phoneNumber}
                onChange={handleChange}
                css={inputStyles}
              />
            ) : (
              <div css={valueStyles}>{updatedEmployee.phoneNumber}</div>
            )}
          </div>
          <div>
            <div css={titleStyles}>계좌 번호</div>
            {editMode ? (
              <div css={{ display: 'flex', alignItems: 'center' }}>
                <BankSelectComponent selectedBank={selectedBank} onChange={handleBankChange} />
                <input
                  type="text"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={handleChange}
                  css={[inputStyles, { marginLeft: '30px' }]}
                />
              </div>
            ) : (
              <div css={valueStyles}>{updatedEmployee.accountNumber}</div>
            )}
          </div>
          <div>
            <div css={titleStyles}>이달 급여</div>
            {editMode ? (
              <input
                type="number"
                name="baseSalary"
                value={updatedEmployee.baseSalary}
                onChange={handleChange}
                css={inputStyles}
              />
            ) : (
              <div css={valueStyles}>
                {new Intl.NumberFormat('ko-KR').format(parseInt(updatedEmployee.baseSalary, 10))}원
              </div>
            )}
          </div>
          {splitWorkDays.map((workDay, index) => {
            const [days, timeRange] = workDay.trim().split(' ');
            const [startTime, endTime] = timeRange.split('~');
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div css={{ gridColumn: 'span 2' }} key={index}>
                <div css={titleStyles}>근무 시간 {index + 1}</div>
                <div css={workTimeStyles}>
                  <DaysOfWeek workDay={days} editable={editMode} onDayClick={(days) => handleDayClick(days, index)} />
                  {editMode ? (
                    <>
                      <WorkTimePicker
                        value={startTime}
                        onChange={(newStartTime) => {
                          const updatedWorkDays = [...splitWorkDays];
                          updatedWorkDays[index] = `${days} ${newStartTime}~${endTime}`;
                          setUpdatedEmployee({
                            ...updatedEmployee,
                            workDay: updatedWorkDays.join(', '),
                          });
                        }}
                      />
                      <span css={valueStyles}>~</span>
                      <WorkTimePicker
                        value={endTime}
                        onChange={(newEndTime) => {
                          const updatedWorkDays = [...splitWorkDays];
                          updatedWorkDays[index] = `${days} ${startTime}~${newEndTime}`;
                          setUpdatedEmployee({
                            ...updatedEmployee,
                            workDay: updatedWorkDays.join(', '),
                          });
                        }}
                      />
                    </>
                  ) : (
                    <div css={valueStyles}>{timeRange}</div>
                  )}
                </div>
              </div>
            );
          })}
          {!editMode && (
            <div css={[titleStyles, { gridColumn: 'span 2' }]}>
              <div css={titleStyles}>스케줄 정정 요청 내역</div>
              <EmployeeScheduleRequests />
            </div>
          )}
        </div>
        <div css={ButtonStyles}>
          {editMode ? (
            <Button onClick={handleSave}>저장</Button>
          ) : (
            <Button onClick={() => setEditMode(true)}>직원 수정</Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeSpecificModal;
export type { Employee };
