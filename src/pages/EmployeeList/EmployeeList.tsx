/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../../Components/Button.tsx';
import EmployeeSpecificModal, { Employee } from '../../Components/EmployeeList/EmployeeSpecificModal.tsx';
import EmployeeAddModal from '../../Components/EmployeeList/EmployeeAdd.tsx';
import PaginationComponent from '../../Components/pagination.tsx';

const COUNT_PER_PAGE = 4;

const employeeData = [
  {
    id: '1',
    name: '김수민',
    phone: '010-1234-1234',
    workHours: '월,화,수 17:00~21:00',
    account: '국민 123456715679813',
    salary: '300,000',
  },
  {
    id: '2',
    name: '임효정',
    phone: '010-1234-1234',
    workHours: '월,금 08:00~12:00',
    account: '하나 123456715679813',
    salary: '300,000',
  },
  {
    id: '3',
    name: '양해석',
    phone: '010-1234-1234',
    workHours: '토 10:00~19:00',
    account: '카카오뱅크 123456715679813',
    salary: '300,000',
  },
  {
    id: '4',
    name: '김승민',
    phone: '010-1234-1234',
    workHours: '일 10:00~19:00',
    account: '토스뱅크 123456715679813',
    salary: '300,000',
  },
  {
    id: '5',
    name: '이민수',
    phone: '010-1234-5678',
    workHours: '화,목 13:00~17:00',
    account: '신한 123456715679813',
    salary: '350,000',
  },
  {
    id: '6',
    name: '박지은',
    phone: '010-2345-6789',
    workHours: '수,금 09:00~18:00',
    account: '우리 123456715679813',
    salary: '400,000',
  },
  {
    id: '7',
    name: '최현우',
    phone: '010-3456-7890',
    workHours: '월,수,금 08:00~12:00',
    account: '하나 123456715679813',
    salary: '320,000',
  },
  {
    id: '8',
    name: '김다현',
    phone: '010-4567-8901',
    workHours: '화,목 14:00~18:00',
    account: '국민 123456715679813',
    salary: '310,000',
  },
  {
    id: '9',
    name: '이서준',
    phone: '010-5678-9012',
    workHours: '월,수 10:00~15:00',
    account: '카카오뱅크 123456715679813',
    salary: '290,000',
  },
  {
    id: '10',
    name: '박준서',
    phone: '010-6789-0123',
    workHours: '화,목 09:00~12:00',
    account: '토스뱅크 123456715679813',
    salary: '280,000',
  },
  {
    id: '11',
    name: '김민지',
    phone: '010-7890-1234',
    workHours: '월,수,금 12:00~16:00',
    account: '국민 123456715679813',
    salary: '350,000',
  },
  {
    id: '12',
    name: '이은주',
    phone: '010-8901-2345',
    workHours: '화,목 13:00~17:00',
    account: '신한 123456715679813',
    salary: '370,000',
  },
  {
    id: '13',
    name: '정우진',
    phone: '010-9012-3456',
    workHours: '월,금 09:00~13:00',
    account: '하나 123456715679813',
    salary: '300,000',
  },
  {
    id: '14',
    name: '최수아',
    phone: '010-0123-4567',
    workHours: '화,목 14:00~18:00',
    account: '우리 123456715679813',
    salary: '320,000',
  },
  {
    id: '15',
    name: '박지훈',
    phone: '010-1234-5678',
    workHours: '수,금 08:00~12:00',
    account: '카카오뱅크 123456715679813',
    salary: '310,000',
  },
  {
    id: '16',
    name: '김하늘',
    phone: '010-2345-6789',
    workHours: '월,수,금 10:00~14:00',
    account: '국민 123456715679813',
    salary: '330,000',
  },
  {
    id: '17',
    name: '이성민',
    phone: '010-3456-7890',
    workHours: '화,목 15:00~19:00',
    account: '토스뱅크 123456715679813',
    salary: '340,000',
  },
  {
    id: '18',
    name: '박지우',
    phone: '010-4567-8901',
    workHours: '수,금 13:00~17:00',
    account: '하나 123456715679813',
    salary: '360,000',
  },
  {
    id: '19',
    name: '최예은',
    phone: '010-5678-9012',
    workHours: '월,화 09:00~12:00',
    account: '신한 123456715679813',
    salary: '300,000',
  },
  {
    id: '20',
    name: '이주원',
    phone: '010-6789-0123',
    workHours: '수,금 08:00~12:00',
    account: '우리 123456715679813',
    salary: '320,000',
  },
  {
    id: '21',
    name: '김태연',
    phone: '010-7890-1234',
    workHours: '월,목 10:00~14:00',
    account: '카카오뱅크 123456715679813',
    salary: '310,000',
  },
  {
    id: '22',
    name: '박서준',
    phone: '010-8901-2345',
    workHours: '화,금 13:00~17:00',
    account: '국민 123456715679813',
    salary: '300,000',
  },
  {
    id: '23',
    name: '이준희',
    phone: '010-9012-3456',
    workHours: '월,수 09:00~13:00',
    account: '신한 123456715679813',
    salary: '280,000',
  },
  {
    id: '24',
    name: '최유진',
    phone: '010-0123-4567',
    workHours: '화,목 14:00~18:00',
    account: '하나 123456715679813',
    salary: '290,000',
  },
  {
    id: '25',
    name: '김수지',
    phone: '010-1234-5678',
    workHours: '월,수,금 08:00~12:00',
    account: '카카오뱅크 123456715679813',
    salary: '300,000',
  },
  {
    id: '26',
    name: '박재민',
    phone: '010-2345-6789',
    workHours: '화,목 10:00~14:00',
    account: '국민 123456715679813',
    salary: '310,000',
  },
  {
    id: '27',
    name: '최민지',
    phone: '010-3456-7890',
    workHours: '수,금 15:00~19:00',
    account: '토스뱅크 123456715679813',
    salary: '320,000',
  },
  {
    id: '28',
    name: '이현우',
    phone: '010-4567-8901',
    workHours: '월,수,금 13:00~17:00',
    account: '신한 123456715679813',
    salary: '330,000',
  },
  {
    id: '29',
    name: '박성현',
    phone: '010-5678-9012',
    workHours: '화,목 09:00~13:00',
    account: '하나 123456715679813',
    salary: '340,000',
  },
  {
    id: '30',
    name: '김유진',
    phone: '010-6789-0123',
    workHours: '월,수 10:00~15:00',
    account: '카카오뱅크 123456715679813',
    salary: '350,000',
  },
  {
    id: '31',
    name: '이수현',
    phone: '010-7890-1234',
    workHours: '화,금 08:00~12:00',
    account: '국민 123456715679813',
    salary: '360,000',
  },
  {
    id: '32',
    name: '박하늘',
    phone: '010-8901-2345',
    workHours: '월,목 13:00~17:00',
    account: '신한 123456715679813',
    salary: '370,000',
  },
  {
    id: '33',
    name: '최지은',
    phone: '010-9012-3456',
    workHours: '수,금 10:00~14:00',
    account: '하나 123456715679813',
    salary: '380,000',
  },
  {
    id: '34',
    name: '김준수',
    phone: '010-0123-4567',
    workHours: '화,목 09:00~13:00',
    account: '카카오뱅크 123456715679813',
    salary: '390,000',
  },
  {
    id: '35',
    name: '박민아',
    phone: '010-1234-5678',
    workHours: '월,수,금 14:00~18:00',
    account: '국민 123456715679813',
    salary: '400,000',
  },
  {
    id: '36',
    name: '이서영',
    phone: '010-2345-6789',
    workHours: '화,목 13:00~17:00',
    account: '신한 123456715679813',
    salary: '410,000',
  },
  {
    id: '37',
    name: '최민수',
    phone: '010-3456-7890',
    workHours: '월,수 08:00~12:00',
    account: '하나 123456715679813',
    salary: '420,000',
  },
  {
    id: '38',
    name: '김지민',
    phone: '010-4567-8901',
    workHours: '화,금 10:00~14:00',
    account: '카카오뱅크 123456715679813',
    salary: '430,000',
  },
  {
    id: '39',
    name: '박정우',
    phone: '010-5678-9012',
    workHours: '월,수,금 13:00~17:00',
    account: '토스뱅크 123456715679813',
    salary: '440,000',
  }
];


const parentStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 76px);
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
  font-weight: var(--font-weight-bold);
  padding-bottom: 20px;
  color: var(--text-gray);
  font-size: var(--font-size-h4);
`;

const tdStyles = css`
  border-top: 1px solid #e0e0e0;
  height: 130px;
  vertical-align: middle; /* 세로 가운데 정렬 */
  color: var(--text-gray);
  font-size: var(--font-size-h5);
`;

const EmployeeList: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState<Employee[]>([]);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSaveEmployee = (employee: Employee) => {
    employeeData.push(employee);
    setIsAddModalOpen(false);
    setPage(Math.ceil(employeeData.length / COUNT_PER_PAGE));
    setData(employeeData.slice((page - 1) * COUNT_PER_PAGE, page * COUNT_PER_PAGE));
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsAddModalOpen(false);
  };

  const LAST_PAGE = Math.ceil(employeeData.length / COUNT_PER_PAGE);

  useEffect(() => {
    if (page === LAST_PAGE) {
      setData(employeeData.slice(COUNT_PER_PAGE * (page - 1)));
    } else {
      setData(employeeData.slice(COUNT_PER_PAGE * (page - 1), COUNT_PER_PAGE * page));
    }
  }, [page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div css={parentStyles}>
      <div css={headerSectionStyles}>
        <h2 css={{ fontWeight: 'bold', color: 'var(--text-gray)' }}>직원 리스트</h2>
        <div css={{ display: 'flex', gap: '20px' }}>
          <Button variant="secondary" onClick={() => console.log('직원 삭제 클릭됨')}>직원 삭제</Button>
          <Button customWidth="44px" customFontSize="30px" onClick={() => setIsAddModalOpen(true)}>+</Button>
        </div>
      </div>
      <div css={{ display: 'flex', flexDirection: 'column', height: '680px', width: '100%' }}>
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
              {data.map((employee) => (
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
      <PaginationComponent
          count={LAST_PAGE}
          page={page}
          onChange={handlePageChange}
          />
    </div>
  );
};

export default EmployeeList;
