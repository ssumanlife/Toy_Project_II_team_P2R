/* eslint-disable jsx-a11y/control-has-associated-label */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../../Components/Button.tsx';
import Modal from '../../Components/Modal.tsx';
import EmployeeSpecificModal, { Employee } from '../../Components/EmployeeList/EmployeeSpecificModal.tsx';
import EmployeeAddModal from '../../Components/EmployeeList/EmployeeAdd.tsx';
import PaginationComponent from '../../Components/pagination.tsx';
import getEmployeeData from '../../API/Firebase/GetEmployeeData.ts';
import deleteEmployee from '../../API/Firebase/DeleteEmployeeList.ts';
import addEmployee from '../../API/Firebase/AddEmployeeList.ts';

const COUNT_PER_PAGE = 8;

const warper = css`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const parentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 76px);
  width: 100%;
  background-color: var(--background-main);
`;

const headerSectionStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px 0 20px;
  border-bottom: 1px solid #e0e0e0;
  h3 {
    font-weight: bold;
  }
`;

const tableContainerStyles = css`
  width: 95%;
  margin: 30px auto; /* 가운데 정렬 */
  border-radius: var(--border-radius-large);
  padding: 10px 20px 0;
  box-shadow: var(--shadow-default);
`;

const thStyles = css`
  text-align: left;
  font-weight: var(--font-weight-medium);
  padding-bottom: 10px;
  color: var(--text-gray);
  font-size: var(--font-size-h5);
`;

const tdStyles = css`
  border-top: 1px solid #e0e0e0;
  height: 65px;
  vertical-align: middle; /* 세로 가운데 정렬 */
  color: var(--text-gray);
  font-size: var(--font-size-h6);
`;

const deleteButtonStyles = css`
  display: inline-block;
  color: var(--text-white);
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-color: #f64d4d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmployeeList: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [data, setData] = useState<Employee[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const employeeData = await getEmployeeData();

      setEmployees(employeeData);
      setData(employeeData.slice((page - 1) * COUNT_PER_PAGE, page * COUNT_PER_PAGE));
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const updatedData = employees.slice((page - 1) * COUNT_PER_PAGE, page * COUNT_PER_PAGE);
    setData(updatedData);
  }, [employees, page]);

  const handleRowClick = (employee: Employee) => {
    if (!isDeleteMode) {
      setSelectedEmployee(employee);
    }
  };

  const handleDeleteClick = (employee: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEmployee = async (employee: Employee) => {
    try {
      const savedEmployee = await addEmployee(employee);

      const updatedEmployeeData = [...employees, savedEmployee];

      updatedEmployeeData.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR', { sensitivity: 'base' }));

      const employeeIndex = updatedEmployeeData.findIndex((emp) => emp.employeeId === savedEmployee.employeeId);
      const newPage = Math.floor(employeeIndex / COUNT_PER_PAGE) + 1;

      setEmployees(updatedEmployeeData);
      setPage(newPage);
      setData(updatedEmployeeData.slice((newPage - 1) * COUNT_PER_PAGE, newPage * COUNT_PER_PAGE));

      setIsAddModalOpen(false);
    } catch (error) {
      console.warn('Failed to save employee:', error);
    }
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      try {
        await deleteEmployee(selectedEmployee.employeeId);
        const updatedEmployeeData = employees.filter((emp) => emp.employeeId !== selectedEmployee.employeeId);
        setEmployees(updatedEmployeeData);
        setSelectedEmployee(null);
        setPage(1);
        setData(updatedEmployeeData.slice(0, COUNT_PER_PAGE));
        setIsDeleteModalOpen(false);
        setIsDeleteMode(false);
      } catch (error) {
        console.warn('Failed to delete employee', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsDeleteMode(false);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const LAST_PAGE = Math.ceil(employees.length / COUNT_PER_PAGE);

  const formatSalary = (salary: string) => new Intl.NumberFormat('ko-KR').format(parseInt(salary, 10));

  return (
    <div css={warper}>
      <div css={parentStyles}>
        <div css={headerSectionStyles}>
          <h3 css={{ fontWeight: 'bold', color: 'var(--text-gray)' }}>직원 리스트</h3>
          <div css={{ display: 'flex', gap: '20px' }}>
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteMode(!isDeleteMode);
                setSelectedEmployee(null);
              }}
            >
              직원 삭제
            </Button>
            <Button customWidth="40px" customFontSize="30px" onClick={() => setIsAddModalOpen(true)}>
              +
            </Button>
          </div>
        </div>
        <div css={{ display: 'flex', flexDirection: 'column', height: '640px', width: '100%' }}>
          <div css={tableContainerStyles}>
            <table css={{ width: '100%' }}>
              <thead>
                <tr>
                  <th css={{ width: '50px' }} />
                  <th css={thStyles}>이름</th>
                  <th css={thStyles}>연락처</th>
                  <th css={thStyles}>근무시간</th>
                  <th css={thStyles}>계좌</th>
                  <th css={thStyles}>급여</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee) => (
                  <tr
                    key={employee.employeeId}
                    css={{ cursor: isDeleteMode ? 'default' : 'pointer' }}
                    onClick={() => handleRowClick(employee)}
                  >
                    <td css={tdStyles}>
                      {isDeleteMode && (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <span css={deleteButtonStyles} onClick={(e) => handleDeleteClick(employee, e)}>
                          −
                        </span>
                      )}
                    </td>
                    <td css={tdStyles}>{employee.name}</td>
                    <td css={tdStyles}>{employee.phoneNumber}</td>
                    <td css={tdStyles}>{employee.workDay}</td>
                    <td css={tdStyles}>{employee.accountNumber}</td>
                    <td css={[tdStyles, { color: 'var(--primary-blue)' }]}>{formatSalary(employee.baseSalary)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedEmployee && isDeleteMode && isDeleteModalOpen && (
            <Modal isOpen={isDeleteModalOpen} onClose={closeModal} showCloseButton={false}>
              <p
                css={{ display: 'flex', justifyContent: 'center', marginTop: '30px', fontSize: 'var(--font-size-h5)' }}
              >
                {selectedEmployee.name}님을 삭제하시겠습니까?
              </p>
              <div css={{ display: 'flex', justifyContent: 'center', marginTop: '40px', gap: '20px', padding: '20px' }}>
                <Button variant="secondary" onClick={handleDeleteEmployee}>
                  확인
                </Button>
                <Button variant="primary" onClick={closeModal}>
                  취소
                </Button>
              </div>
            </Modal>
          )}
          {selectedEmployee && !isDeleteMode && (
            <EmployeeSpecificModal isOpen={!!selectedEmployee} onClose={closeModal} employee={selectedEmployee} />
          )}
          {isAddModalOpen && (
            <EmployeeAddModal isOpen={isAddModalOpen} onClose={closeModal} onSave={handleSaveEmployee} />
          )}
        </div>
        <PaginationComponent count={LAST_PAGE} page={page} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default EmployeeList;
