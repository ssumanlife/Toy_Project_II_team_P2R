/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import Select from '../../Components/Select.tsx';
import { getCollectionData } from '../../API/Firebase/GetUserData.tsx';

const SelectWidthCustom = css`
  width: 120px;
  font-size: 16px;
`;

interface PayData {
  baseSalary: number;
  weeklyHolidayAllowance: number;
  additionalAllowance: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
}

export interface SalaryCorrection {
  id: number;
  name: string;
  month: string;
  reasonForApplication: string;
  correctionDetails: string;
  onModal?: any;
  approval?: string;
  correctionState: string;
  deleteSalaryCorrection?: (id: number) => void | undefined;
}
export interface EmployeeSalaryType {
  id: number;
  name: string;
  date: string;
  payData: PayData;
  isViewed: boolean;
}

const PayrollHistory = () => {
  const [salaryCorrectionLists, setSalaryCorrectionLists] = useState<SalaryCorrection[]>([]);
  const [employeeSalary, setEmployeeSalary] = useState<EmployeeSalaryType[]>([]);
  const [month, setMonth] = useState('2024 07월');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const userIsAdminVelidation = () => {
      user.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
    };
    userIsAdminVelidation();
  }, [isAdmin]);

  useEffect(() => {
    const setEmployeeSalaryListData = async () => {
      const newMonth = Number(month.slice(6, 7));
      const employeeSalaryData = await getCollectionData('payrollDetails');
      const setEmployeeSalaryData = [];
      for (let i = 0; i < employeeSalaryData.length; i++) {
        if (user.isAdmin || employeeSalaryData[i].name === user.name) {
          if (user.isAdmin && employeeSalaryData[i].month !== newMonth) {
            continue;
          }
          const data = {
            id: i + 1,
            name: employeeSalaryData[i].name,
            month: employeeSalaryData[i].month,
            payData: {
              baseSalary: employeeSalaryData[i].baseSalary,
              weeklyHolidayAllowance: employeeSalaryData[i].weeklyHolidayAllowance,
              additionalAllowance: employeeSalaryData[i].additionalAllowance,
              nationalPension: employeeSalaryData[i].nationalPension,
              healthInsurance: employeeSalaryData[i].healthInsurance,
              longTermCare: employeeSalaryData[i].longTermCare,
              employmentInsurance: employeeSalaryData[i].employmentInsurance,
            },
            isViewed: employeeSalaryData[i].isViewed,
          };
          setEmployeeSalaryData.push(data);
        }
      }
      setEmployeeSalary(setEmployeeSalaryData);
    };
    setEmployeeSalaryListData();
  }, [month]);

  useEffect(() => {
    const setSalaryCorrectionListData = async () => {
      const salaryCorrectionData = await getCollectionData('payrollCorApp');
      const setSalaryCorrectionData = [];
      for (let i = 0; i < salaryCorrectionData.length; i++) {
        if (user.isAdmin || salaryCorrectionData[i].name === user.name) {
          const data = {
            id: i + 1,
            name: salaryCorrectionData[i].name,
            month: salaryCorrectionData[i].month,
            reasonForApplication: salaryCorrectionData[i].reasonForApplication,
            correctionDetails: salaryCorrectionData[i].correctionDetails,
            correctionState: salaryCorrectionData[i].correctionState,
          };
          setSalaryCorrectionData.push(data);
        }
      }
      setSalaryCorrectionData.sort((a, b) => b.month - a.month);
      setSalaryCorrectionLists(setSalaryCorrectionData);
    };
    setSalaryCorrectionListData();
  }, []);

  const handleSelect = (option: string) => {
    setMonth(option);
  };

  const handleApproval = () => {
    const idState = id.slice(0, 1);
    if (idState === 'v') {
      const idValue = id.slice(1);
      const changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].correctionState = 'approval';
    } else if (idState === 'x') {
      const idValue = id.slice(1);
      const changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].correctionState = 'reject';
    }
    setModal(false);
  };

  const onYnNModal = (id) => {
    modal ? setModal(false) : setModal(true);
    setId(id);
  };

  const stateFilter = (stateValue: string) => {
    let newStateList: string[] = [];
    for (let i = 0; i < salaryCorrectionLists.length; i++) {
      if (salaryCorrectionLists[i].correctionState === stateValue) {
        newStateList.push(salaryCorrectionLists[i]);
      }
    }
    setSalaryCorrectionLists(newStateList);
  };

  const handleIsViewd = (id: number) => {
    const newIsViwedEmploySalary = [...employeeSalary];
    for (let iv = 0; iv < newIsViwedEmploySalary.length; iv++) {
      if (newIsViwedEmploySalary[iv].id === id) {
        newIsViwedEmploySalary[iv].isViewed = true;
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
            newEmploySalary[es].payData.additionalAllowance = Number(additionalPayChange);
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
          newFilterEmploySalary[es].payData.additionalAllowance = Number(value);
          break;
        }
      }
      setEmployeeSalary(newFilterEmploySalary);
    } else {
      alert('숫자만 입력 가능합니다.');
    }
  };

  const addSalaryCorrectionList = (option: string, content: string) => {
    const newSalaryCorrectionLists = [...salaryCorrectionLists];
    const newId: number = newSalaryCorrectionLists.length + 1;
    newSalaryCorrectionLists.unshift({
      id: newId,
      name: user.name,
      month: '7월',
      reasonForApplication: option,
      correctionDetails: content,
      correctionState: 'standBy',
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
                options={['2024 07월', '2024 06월', '2024 05월', '2024 04월']}
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
              isViewed={item.isViewed}
              handleIsViewd={handleIsViewd}
              addSalaryCorrectionList={addSalaryCorrectionList}
              month={month}
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
                <td css={{ width: '106px' }}>정정 사유</td>
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
                  month={item.month}
                  reasonForApplication={item.reasonForApplication}
                  correctionDetails={item.correctionDetails}
                  correctionState={item.correctionState}
                  onYnNModal={onYnNModal}
                  deleteSalaryCorrection={deleteSalaryCorrection}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div css={noListWrapper}>
            <span className="material-symbols-outlined">error</span>
            <p>신청 내역이 없습니다.</p>
          </div>
        )}

        {modal ? <ApprovalModal id={id} handleApproval={handleApproval} onYnNModal={onYnNModal} /> : null}
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
