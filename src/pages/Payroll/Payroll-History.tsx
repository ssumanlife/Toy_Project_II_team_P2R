/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';

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
      title: '연장근무 미반영',
      content: '6월 22일 주말피크 2시간 연장근무 급여 누락 된 것 습니다.',
      state: 'normal',
    },
    {
      id: 2,
      name: '양해석',
      monthly: '6월',
      title: '추가근무 미반영',
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
      title: '연장근무 미 반영',
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
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);

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

  const handleAdditionalPay = (value, id) => {
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
        // setEmployeeSalary(employeeSalary);
      }
    } else if (/^\d+$/.test(value)) {
      let newEmploySalary = [...employeeSalary];
      for (let es = 0; es < newEmploySalary.length; es++) {
        if (newEmploySalary[es].id === id) {
          newEmploySalary[es].payData.additionalPay = Number(value);
          break;
        }
      }
      setEmployeeSalary(newEmploySalary);
    } else {
      alert('숫자만 입력 가능합니다.');
      // setEmployeeSalary(employeeSalary);
    }
  };

  return (
    <div css={wrapper}>
      <div css={salaryCorrectionArea}>
        <div css={salaryCorrectionheader}>
          <h3>직원 급여 내역</h3>
          <div>
            <select id="day" css={select}>
              <option value="2024 6월">2024 6월</option>
              <option value="2024 5월">2024 5월</option>
              <option value="2024 4월">2024 4월</option>
              <option value="2024 3월">2024 3월</option>
            </select>
          </div>
        </div>
        <ul css={{ padding: 0, width: '100%', height: '450px', overflowY: 'auto', marginBottom: '15px' }}>
          {employeeSalary.map((item) => (
            <PayList
              key={item.id}
              id={item.id}
              name={item.name}
              payData={item.payData}
              handleAdditionalPay={handleAdditionalPay}
              isViewd={item.isViewd}
              handleIsViewd={handleIsViewd}
            />
          ))}
        </ul>
        <div css={salaryCorrectionheader}>
          <h3>급여 정정 요청 내역</h3>
          <div>
            <button onClick={() => stateFilter('normal')} css={[headerBtn, gray]}>
              대기중
            </button>
            <button onClick={() => stateFilter('approval')} css={[headerBtn, blue]}>
              승인
            </button>
            <button onClick={() => stateFilter('reject')} css={[headerBtn, red]}>
              반려
            </button>
          </div>
        </div>
        <table css={listTable}>
          <thead>
            <tr css={trStyle}>
              <td>요청자</td>
              <td>월</td>
              <td>정정 사유</td>
              <td>정정 내용</td>
              <td css={{ textAlign: 'center' }}>상태</td>
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
              />
            ))}
          </tbody>
        </table>
        {modal ? <ApprovalModal id={id} handleApproval={handleApproval} onModal={onModal} /> : null}
      </div>
    </div>
  );
};

export default PayrollHistory;
const wrapper = css`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const salaryCorrectionArea = css`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const salaryCorrectionheader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px;
  border-bottom: 1px solid #f0f0f0;
`;
const select = css`
  border: none;
  font-size: 16px;
  outline: none;
`;

const headerBtn = css`
  width: 90px;
  height: 25px;
  border: none;
  border-radius: 7px;
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
  box-shadow: 0 0.4rem 1.5rem -0.4rem rgba(10, 10, 20, 0.2);
  border-radius: 5px 5px 0 0;
`;
const trStyle = css`
  height: 50px;
  text-align: 'center';
  td {
    vertical-align: middle;
    padding-left: 15px;
  }
`;
