/* eslint-disable no-console */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store.ts';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import Select from '../../Components/Select.tsx';
import { getCollectionData } from '../../API/Firebase/GetUserData.ts';
import updatePayrollData from '../../API/Firebase/UpdatePayrollData.ts';
import updateCorrectionState from '../../API/Firebase/UpdatePayrollCorApp.ts';
import createPayrollCorApp from '../../API/Firebase/CreatePayrollCorApp.ts';
import deleteSalaryCorrectionAPI from '../../API/Firebase/DeleteSalaryCorrection.ts';
import { showModal, hiddenModal } from '../../Reducers/ModalSlice.ts';
import { fetchEmployeeSalaryData, setEmployeeSalary } from '../../Reducers/EmployeeSalarySlice.ts';

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
  const dispatch: AppDispatch = useDispatch();
  const yesNoModal = useSelector((state: RootState) => state.modal.modals['yesNoModal']);
  const employeeSalary: EmployeeSalaryType[] = useSelector(
    (state: RootState) => state.employeeSalary.employeeSalaryData,
  );
  const [salaryCorrectionLists, setSalaryCorrectionLists] = useState<SalaryCorrection[]>([]);
  const [originalSalaryCorrectionLists, setOriginalSalaryCorrectionLists] = useState<SalaryCorrection[]>([]);
  const [month, setMonth] = useState('2024 07월');
  const [btnId, setBtnId] = useState<string>('');
  const [errText, setErrText] = useState<string | null>(null);
  const [isNull, setIsNull] = useState(false);
  const [openModalName, setOpenModalName] = useState<string | null>(null);
  const { user } = useAuthContext();
  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    if (user) {
      dispatch(fetchEmployeeSalaryData({ month, isAdmin, userName: user.name }));
    }
  }, [month]);

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
      setOriginalSalaryCorrectionLists(setSalaryCorrectionData);
    };
    setSalaryCorrectionListData();
  }, []);

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
    dispatch(hiddenModal('yesNoModal'));
  };

  const onYesNoModal = (id: string) => {
    yesNoModal ? dispatch(hiddenModal('yesNoModal')) : dispatch(showModal('yesNoModal'));
    setBtnId(id);
  };

  const onSpacificationModal = (name: string | null) => {
    if (openModalName === name) {
      setOpenModalName(null);
    } else {
      setOpenModalName(name);
    }
  };

  const stateFilter = (stateValue: string) => {
    const newStateList: SalaryCorrection[] = originalSalaryCorrectionLists.filter(
      (item) => item.correctionState === stateValue,
    );
    setSalaryCorrectionLists(newStateList);
  };

  const handleIsViewd = (id: number, name: string, month: number): void => {
    const newIsViwedEmploySalary = employeeSalary.map((employee) => {
      if (employee.id === id) {
        if (user?.isAdmin) {
          return {
            ...employee,
            adminViewed: true,
          };
        }
        return {
          ...employee,
          isViewed: true,
        };
      }
      return employee;
    });
    dispatch(setEmployeeSalary(newIsViwedEmploySalary));
    additionalPayUpdate(name, month, 'notChange', user?.isAdmin);
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
      console.error(new Error('faild to update'));
    }
  };

  const handleAdditionalPay = (inputValue: string | undefined, id: number, name: string, month: number): void => {
    if (inputValue !== undefined)
      if (/,/g.test(inputValue)) {
        const additionalPayChange = inputValue.replaceAll(',', '');
        if (/^\d+$/.test(additionalPayChange)) {
          const newEmploySalary = employeeSalary.map((employee) => {
            if (employee.id === id) {
              return {
                ...employee,
                payData: {
                  ...employee.payData,
                  additionalAllowance: Number(additionalPayChange),
                },
              };
            }
            return employee;
          });
          dispatch(setEmployeeSalary(newEmploySalary));
          additionalPayUpdate(name, month, Number(additionalPayChange), user?.isAdmin);
          setErrText(null);
        } else {
          setErrText('숫자만 입력 가능합니다.');
        }
      } else if (/^\d+$/.test(inputValue)) {
        const newFilterEmploySalary = employeeSalary.map((employee) => {
          if (employee.id === id) {
            return {
              ...employee,
              payData: {
                ...employee.payData,
                additionalAllowance: Number(inputValue),
              },
            };
          }
          return employee;
        });
        dispatch(setEmployeeSalary(newFilterEmploySalary));
        additionalPayUpdate(name, month, Number(inputValue), user?.isAdmin);
        setErrText(null);
      } else {
        setErrText('숫자만 입력 가능합니다.');
      }
  };

  const today = new Date();
  const currentDate = Number(new Date(today).toISOString().substring(6, 7));

  const addSalaryCorrectionList = (name: string, reason: string, textareaValue: string | null) => {
    if (reason !== '선택해주세요.' && textareaValue !== null && user?.name !== undefined) {
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
      setOpenModalName(null);
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
              openModalName={openModalName}
              onSpacificationModal={onSpacificationModal}
              adminViewed={item.adminViewed}
              errText={errText}
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
                <td css={{ minWidth: '120px', paddingLeft: '58px' }}>요청자</td>
                <td css={{ minWidth: '150px' }}>월</td>
                <td css={{ minWidth: '190px' }}>정정 사유</td>
                <td>정정 내용</td>
                <td css={{ textAlign: 'center', minWidth: '190px' }}>상태</td>
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
                  onYesNoModal={onYesNoModal}
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
        {yesNoModal ? (
          <ApprovalModal btnId={btnId} handleApproval={handleApproval} onYesNoModal={onYesNoModal} />
        ) : null}
      </div>
    </div>
  );
};

export default PayrollHistory;

const wrapper = css`
  height: calc(100vh - 76px);
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: start;
`;
const salaryCorrectionArea = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
`;

const salaryCorrectionheader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid #e0e0e0;
  h3 {
    font-weight: bold;
  }
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
  border-radius: 20px;
`;
const trStyle = css`
  td {
    height: 60px;
    vertical-align: middle;
    font-size: var(--font-size-h5);
    font-weight: var(--font-weight-medium);
  }
  height: 50px;
  text-align: 'center';
`;

const noListWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 70px;
    font-weight: 300;
    margin: 25px 0 10px;
    color: var(--text-white-gray);
  }
  p {
    color: var(--text-light-gray);
  }
`;
