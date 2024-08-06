/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import Select from '../../Components/Select.tsx';
import { getCollectionData } from '../../API/Firebase/GetUserData.tsx';
import updatePayrollData from '../../API/Firebase/UpdatePayrollData.tsx';
import updateCorrectionState from '../../API/Firebase/UpdatePayrollCorApp.tsx';
import createPayrollCorApp from '../../API/Firebase/CreatePayrollCorApp.tsx';
import deleteSalaryCorrectionAPI from '../../API/Firebase/DeleteSalaryCorrection.tsx';

const SelectWidthCustom = css`
  width: 120px;
  font-size: 16px;
`;

export interface PayData {
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
  month: number;
  reasonForApplication: string;
  correctionDetails: string;
  onModal?: any;
  approval?: string;
  correctionState: string;
}
export interface EmployeeSalaryType {
  id: number;
  name: string;
  payData: PayData;
  isViewed: boolean;
  month: number;
  adminViewed: boolean;
}

const PayrollHistory: React.FC = () => {
  const [salaryCorrectionLists, setSalaryCorrectionLists] = useState<SalaryCorrection[]>([]);
  const [employeeSalary, setEmployeeSalary] = useState<EmployeeSalaryType[]>([]);
  const [month, setMonth] = useState('2024 07월');
  const [modal, setModal] = useState(false);
  const [spacificationModal, setSpacificationModal] = useState(false);
  const [btnId, setBtnId] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const { user } = useAuthContext();
  useEffect(() => {
    const userIsAdminVelidation = () => {
      setIsAdmin(user?.isAdmin ?? false);
    };
    userIsAdminVelidation();
  }, [user]);

  useEffect(() => {
    const setEmployeeSalaryListData = async () => {
      const newMonth = Number(month.slice(6, 7));
      const employeeSalaryData = await getCollectionData('payrollDetails');
      const setEmployeeSalaryData = [];
      for (let i = 0; i < employeeSalaryData.length; i++) {
        if (user?.isAdmin || employeeSalaryData[i].name === user?.name) {
          if (user?.isAdmin && employeeSalaryData[i].month !== newMonth) {
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
            adminViewed: employeeSalaryData[i].adminViewed,
          };
          setEmployeeSalaryData.push(data);
        }
      }
      setEmployeeSalaryData.sort((a, b) => b.month - a.month);
      setEmployeeSalary(setEmployeeSalaryData);
    };
    setEmployeeSalaryListData();
  }, [month, user]);

  useEffect(() => {
    const setSalaryCorrectionListData = async () => {
      const salaryCorrectionData = await getCollectionData('payrollCorApp');
      const setSalaryCorrectionData = [];
      for (let i = 0; i < salaryCorrectionData.length; i++) {
        if (user?.isAdmin || salaryCorrectionData[i].name === user?.name) {
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
  }, [user]);

  const handleSelect = (option: string) => {
    setMonth(option);
  };

  const handleApproval = (id: string): void => {
    const idState = id.slice(0, 1);
    if (idState === 'v') {
      const idValue = id.slice(1);
      const changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].correctionState = 'approval';
      updateCorrectionState(
        changeList[0].name,
        Number(changeList[0].month),
        'approval',
        changeList[0].correctionDetails,
      );
    } else if (idState === 'x') {
      const idValue = id.slice(1);
      const changeList = salaryCorrectionLists.filter((item) => item.id === Number(idValue));
      changeList[0].correctionState = 'reject';
      updateCorrectionState(changeList[0].name, Number(changeList[0].month), 'reject', changeList[0].correctionDetails);
    }
    setModal(false);
  };

  const onYnNModal = (id: string) => {
    modal ? setModal(false) : setModal(true);
    setBtnId(id);
  };

  const onSpacificationModal = () => {
    spacificationModal ? setSpacificationModal(false) : setSpacificationModal(true);
  };

  const stateFilter = (stateValue: string) => {
    const newStateList: SalaryCorrection[] = [];
    for (let i = 0; i < salaryCorrectionLists.length; i++) {
      if (salaryCorrectionLists[i].correctionState === stateValue) {
        newStateList.push(salaryCorrectionLists[i]);
      }
    }
    setSalaryCorrectionLists(newStateList);
  };

  const handleIsViewd = (id: number, name: string, month: number) => {
    const newIsViwedEmploySalary = [...employeeSalary];
    // user.isAdmin이 true면
    for (let iv = 0; iv < newIsViwedEmploySalary.length; iv++) {
      if (newIsViwedEmploySalary[iv].id === id) {
        if (user?.isAdmin) {
          newIsViwedEmploySalary[iv].adminViewed = true;
        } else {
          newIsViwedEmploySalary[iv].isViewed = true;
        }
        break;
      }
    }
    additionalPayUpdate(name, month, 'notChange', user?.isAdmin);
    setEmployeeSalary(newIsViwedEmploySalary);
  };

  const additionalPayUpdate = async (
    name: string,
    month: number,
    additionalPay: string | number,
    isAdmin: boolean | undefined,
  ) => {
    try {
      await updatePayrollData(name, month, additionalPay, isAdmin);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleAdditionalPay = (inputValue: string | undefined, id: number, name: string, month: number): void => {
    if (inputValue !== undefined) {
      const additionalPayChange = inputValue.replaceAll(',', '');
      if (/^\d+$/.test(additionalPayChange)) {
        const newEmploySalary = [...employeeSalary];
        for (let es = 0; es < newEmploySalary.length; es++) {
          if (newEmploySalary[es].id === id) {
            newEmploySalary[es].payData.additionalAllowance = Number(additionalPayChange);
            break;
          }
        }
        setEmployeeSalary(newEmploySalary);
        additionalPayUpdate(name, month, Number(additionalPayChange), user?.isAdmin);
      } else {
        alert('숫자만 입력 가능합니다.');
      }
    }
  };

  const today = new Date();
  const currentDate = Number(new Date(today).toISOString().substring(6, 7));

  const addSalaryCorrectionList = (name: string, reason: string, textareaValue: string | undefined) => {
    if (reason !== '선택해주세요.' && textareaValue !== undefined) {
      const newSalaryCorrectionLists = [...salaryCorrectionLists];
      const newId: number = newSalaryCorrectionLists.length + 1;
      newSalaryCorrectionLists.unshift({
        id: newId,
        name: user?.name,
        month: currentDate,
        reasonForApplication: reason,
        correctionDetails: textareaValue,
        correctionState: 'standBy',
      });
      setIsNull(false);
      setSpacificationModal(false);
      setSalaryCorrectionLists(newSalaryCorrectionLists);
      createPayrollCorApp(name, currentDate, reason, textareaValue);
    } else {
      setIsNull(true);
    }
  };

  const deleteSalaryCorrection = (id: number, name: string, month: number, correctionDetails: string): void => {
    let newSalaryCorrectionLists = [...salaryCorrectionLists];
    newSalaryCorrectionLists = newSalaryCorrectionLists.filter((item) => item.id !== id);
    setSalaryCorrectionLists(newSalaryCorrectionLists);
    deleteSalaryCorrectionAPI(name, month, correctionDetails);
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
              month={item.month}
              isNull={isNull}
              spacificationModal={spacificationModal}
              onSpacificationModal={onSpacificationModal}
              adminViewed={item.adminViewed}
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
                <td css={{ minWidth: '42px' }}>요청자</td>
                <td css={{ minWidth: '69px' }}>월</td>
                <td css={{ minWidth: '106px' }}>정정 사유</td>
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

        {modal ? <ApprovalModal btnId={btnId} handleApproval={handleApproval} onYnNModal={onYnNModal} /> : null}
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
  max-width: 1280px;
  width: 90%;
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
