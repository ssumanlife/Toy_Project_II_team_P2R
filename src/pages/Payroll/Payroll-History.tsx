/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import Select from '../../Components/Select.tsx';

const SelectWidthCustom = css`
  width: 120px;
  font-size: 16px;
`;

interface PayData {
  basicPay: number;
  weeklyPay: number;
  additionalPay: number;
  nationalPension: number;
  healthInsurance: number;
  care: number;
  employmentInsurance: number;
}

export interface SalaryCorrection {
  id: number;
  name: string;
  monthly: string;
  title: string;
  content: string;
  onModal?: any;
  approval?: string;
  state: string;
  deleteSalaryCorrection?: (id: number) => void | undefined;
}
export interface EmployeeSalaryType {
  id: number;
  name: string;
  date: string;
  payData: PayData;
  isViewd: boolean;
}

const PayrollHistory = () => {
  const [salaryCorrectionLists, setSalaryCorrectionLists] = useState<SalaryCorrection[]>([
    {
      id: 1,
      name: '김수민',
      monthly: '6월',
      title: '업무 연장 미반영',
      content: '6월 22일 주말피크 2시간 연장근무 급여 누락 된 것 습니다.',
      state: 'standBy',
    },
    {
      id: 2,
      name: '양해석',
      monthly: '6월',
      title: '업무 연장 미반영',
      content: '5월 15일 수민님 대타 출근한 4시간 급여 누락되었습니다.',
      state: 'approval',
    },
    {
      id: 3,
      name: '임효정',
      monthly: '2월',
      title: '무급휴가 사용 미반영',
      content: '2월27일 무급 휴가 사용한거 반영이 안되었습니다!',
      state: 'approval',
    },
    {
      id: 4,
      name: '김승민',
      monthly: '1월',
      title: '업무 연장 미반영',
      content: '1월 1일 연장근무 4시간 급여 누락 된 것 습니다.',
      state: 'reject',
    },
  ]);
  const [employeeSalary, setEmployeeSalary] = useState<EmployeeSalaryType[]>([
    {
      id: 1,
      name: '김수민',
      date: '2024.06',
      payData: {
        basicPay: 2300000,
        weeklyPay: 300000,
        additionalPay: 25000,
        nationalPension: 100000,
        healthInsurance: 100000,
        care: 50000,
        employmentInsurance: 60000,
      },
      isViewd: false,
    },
    {
      id: 2,
      name: '양해석',
      date: '2024.06',
      payData: {
        basicPay: 2210000,
        weeklyPay: 370000,
        additionalPay: 39000,
        nationalPension: 100000,
        healthInsurance: 100000,
        care: 50000,
        employmentInsurance: 60000,
      },
      isViewd: false,
    },
    {
      id: 3,
      name: '임효정',
      date: '2024.06',
      payData: {
        basicPay: 2270000,
        weeklyPay: 320000,
        additionalPay: 30000,
        nationalPension: 100000,
        healthInsurance: 100000,
        care: 50000,
        employmentInsurance: 60000,
      },
      isViewd: false,
    },
    {
      id: 4,
      name: '김승민',
      date: '2024.06',
      payData: {
        basicPay: 2300000,
        weeklyPay: 310000,
        additionalPay: 25000,
        nationalPension: 100000,
        healthInsurance: 100000,
        care: 50000,
        employmentInsurance: 60000,
      },
      isViewd: false,
    },
    {
      id: 5,
      name: '강동원',
      date: '2024.06',
      payData: {
        basicPay: 2200000,
        weeklyPay: 300000,
        additionalPay: 25000,
        nationalPension: 100000,
        healthInsurance: 100000,
        care: 50000,
        employmentInsurance: 60000,
      },
      isViewd: false,
    },
    {
      id: 6,
      name: '김우빈',
      date: '2024.06',
      payData: {
        basicPay: 30000,
        weeklyPay: 300000,
        additionalPay: 25000,
        nationalPension: 12000,
        healthInsurance: 10000,
        care: 5000,
        employmentInsurance: 6000,
      },
      isViewd: false,
    },
  ]);
  const [month, setMonth] = useState('2024 06월');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    user.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

  useEffect(() => {
    if (user.isAdmin === false) {
      let newEmployeeSalary = [];
      let newSalaryCorrectionLists = [];

      for (let i = 0; i < employeeSalary.length; i++) {
        if (employeeSalary[i].name === user.name) {
          newEmployeeSalary.push(employeeSalary[i]);
        }
      }
      for (let s = 0; s < salaryCorrectionLists.length; s++) {
        if (salaryCorrectionLists[s].name === user.name) {
          newSalaryCorrectionLists.push(salaryCorrectionLists[s]);
        }
      }
      setEmployeeSalary(newEmployeeSalary);
      setSalaryCorrectionLists(newSalaryCorrectionLists);
    }
  }, [user]);

  const handleSelect = (option: string) => {
    setMonth(option);
  };

  const handleApproval = () => {
    let idState = id.slice(0, 1);
    if (idState === 'v') {
      let idValue = id.slice(1);
      let changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].state = 'approval';
    } else if (idState === 'x') {
      let idValue = id.slice(1);
      let changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].state = 'reject';
    }
    setModal(false);
  };

  const onModal = (id) => {
    modal ? setModal(false) : setModal(true);
    setId(id);
  };

  const stateFilter = (stateValue) => {
    let newStateList = [];
    for (let i = 0; i < salaryCorrectionLists.length; i++) {
      if (salaryCorrectionLists[i].state === stateValue) {
        newStateList.push(salaryCorrectionLists[i]);
      }
    }
    setSalaryCorrectionLists(newStateList);
  };

  const handleIsViewd = (id) => {
    let newIsViwedEmploySalary = [...employeeSalary];
    for (let iv = 0; iv < newIsViwedEmploySalary.length; iv++) {
      if (newIsViwedEmploySalary[iv].id === id) {
        newIsViwedEmploySalary[iv].isViewd = true;
        break;
      }
    }
    setEmployeeSalary(newIsViwedEmploySalary);
  };

  // eslint-disable-next-line no-shadow
  const handleAdditionalPay = (value: string, id: number) => {
    if (/,/g.test(value)) {
      let additionalPayChange = value.replaceAll(',', '');
      if (/^\d+$/.test(additionalPayChange)) {
        let newEmploySalary = [...employeeSalary];
        for (let es = 0; es < newEmploySalary.length; es++) {
          if (newEmploySalary[es].id === id) {
            newEmploySalary[es].payData.additionalPay = Number(additionalPayChange);
            break;
          }
        }
        setEmployeeSalary(newEmploySalary);
      } else {
        alert('숫자만 입력 가능합니다.');
      }
    } else if (/^\d+$/.test(value)) {
      let newFilterEmploySalary = [...employeeSalary];
      for (let es = 0; es < newFilterEmploySalary.length; es++) {
        if (newFilterEmploySalary[es].id === id) {
          newFilterEmploySalary[es].payData.additionalPay = Number(value);
          break;
        }
      }
      setEmployeeSalary(newFilterEmploySalary);
    } else {
      alert('숫자만 입력 가능합니다.');
    }
  };

  const addSalaryCorrectionList = (option: string[], content: string) => {
    let newSalaryCorrectionLists = [...salaryCorrectionLists];
    let newId = newSalaryCorrectionLists.length + 1;
    newSalaryCorrectionLists.unshift({
      id: newId,
      name: user.name,
      monthly: '7월',
      title: option,
      content,
      state: 'standBy',
    });
    setSalaryCorrectionLists(newSalaryCorrectionLists);
  };

  // eslint-disable-next-line no-shadow
  const deleteSalaryCorrection = (id: number) => {
    let newSalaryCorrectionLists = [...salaryCorrectionLists];
    newSalaryCorrectionLists = newSalaryCorrectionLists.filter((item) => item.id !== id);
    setSalaryCorrectionLists(newSalaryCorrectionLists);
  };

  return (
    <div css={wrapper}>
      <div css={salaryCorrectionArea}>
        <div css={[salaryCorrectionheader, { margin: '25px 0 10px' }]}>
          <h3>{isAdmin ? '직원 급여 내역' : '급여 내역'}</h3>
          <div>
            {isAdmin ? (
              <Select
                options={['2024 06월', '2024 05월']}
                defaultLabel={month}
                onSelect={handleSelect}
                css={SelectWidthCustom}
              />
            ) : null}
          </div>
        </div>
        <ul css={ul}>
          {employeeSalary.map((item) => (
            <PayList
              key={item.id}
              id={item.id}
              name={item.name}
              payData={item.payData}
              handleAdditionalPay={handleAdditionalPay}
              isViewd={item.isViewd}
              handleIsViewd={handleIsViewd}
              addSalaryCorrectionList={addSalaryCorrectionList}
            />
          ))}
        </ul>
        <div css={[salaryCorrectionheader, { margin: '25px 0' }]}>
          <h3>{isAdmin ? '급여 정정 요청 내역' : '급여 정정 신청 내역'}</h3>
          {isAdmin ? (
            <div>
              <button onClick={() => stateFilter('standBy')} css={[headerBtn, gray]}>
                대기중
              </button>
              <button onClick={() => stateFilter('approval')} css={[headerBtn, blue]}>
                승인
              </button>
              <button onClick={() => stateFilter('reject')} css={[headerBtn, red]}>
                반려
              </button>
            </div>
          ) : null}
        </div>
        {salaryCorrectionLists.length !== 0 ? (
          <table css={listTable}>
            <thead>
              <tr css={trStyle}>
                <td css={{ width: '42px' }}>요청자</td>
                <td css={{ width: '68px' }}>월</td>
                <td>정정 사유</td>
                <td>정정 내용</td>
                <td css={{ textAlign: 'center', width: '150px' }}>상태</td>
              </tr>
            </thead>
            <tbody>
              {salaryCorrectionLists.map((item) => (
                <SalaryList
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  monthly={item.monthly}
                  title={item.title}
                  content={item.content}
                  state={item.state}
                  onModal={onModal}
                  deleteSalaryCorrection={deleteSalaryCorrection}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div css={noListWrapper}>
            <span className="material-symbols-outlined">error</span>
            <p>신청하신 내역이 없습니다.</p>
          </div>
        )}

        {modal ? <ApprovalModal id={id} handleApproval={handleApproval} onModal={onModal} /> : null}
      </div>
    </div>
  );
};

export default PayrollHistory;
const wrapper = css`
  height: calc(100vh - 76px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: start;
`;
const salaryCorrectionArea = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  top: 0;
`;

const salaryCorrectionheader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid #f0f0f0;
`;

const ul = css`
  padding: 15px;
  width: 100%;
  min-height: 150px;
  max-height: 480px;
  overflow-y: auto;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const headerBtn = css`
  width: 90px;
  height: 25px;
  border: none;
  border-radius: var(--border-radius-small);
  margin-right: 10px;
  color: #333;
  cursor: pointer;
`;
const gray = css`
  background-color: #e6e6e6;
  &:hover {
    background-color: #adadad;
  }
`;
const blue = css`
  background-color: #dceeff;
  &:hover {
    background-color: #70a0fb;
  }
`;
const red = css`
  background-color: #ffe6e6;
  &:hover {
    background-color: #fc8888;
  }
`;
const listTable = css`
  width: 100%;
  box-shadow: var(--shadow-default);
  border-radius: 20px 20px 0 0;
`;
const trStyle = css`
  height: 50px;
  text-align: 'center';
  td {
    vertical-align: middle;
    padding-left: 15px;
  }
`;

const noListWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 70px;
    font-weight: 300;
    margin: 20px 0 10px;
    color: var(--text-white-gray);
  }
  p {
    color: var(--text-light-gray);
  }
`;
