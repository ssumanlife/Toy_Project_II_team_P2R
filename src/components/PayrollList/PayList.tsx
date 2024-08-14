/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { PayData } from '../../Pages/Payroll/PayrollHistory.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import SpacificationModal from './SpacificationModal.tsx';
import { getPayDay } from '../../API/Firebase/Payday.ts';

interface PayListProps {
  id: number;
  name: string;
  payData: PayData;
  handleAdditionalPay: (inputValue: string | undefined, id: number, name: string, month: number) => void;
  isViewed: boolean;
  handleIsViewd: (id: number, name: string, month: number) => void;
  addSalaryCorrectionList: (name: string, reason: string, textareaValue: string | null) => void;
  month: number;
  isNull: boolean;
  openModalName: string | null;
  onSpacificationModal: (name: string | null) => void;
  adminViewed: boolean;
  errText: string | null;
}

const PayList: React.FC<PayListProps> = ({
  id,
  name,
  payData,
  handleAdditionalPay,
  isViewed,
  handleIsViewd,
  addSalaryCorrectionList,
  month,
  isNull,
  openModalName,
  onSpacificationModal,
  adminViewed,
  errText,
}) => {
  const [payDay, setPayDay] = useState<string | null>('');
  const { user } = useAuthContext();
  const userId = String(user?.employeeId);
  const viewedPm = user?.isAdmin ? adminViewed : isViewed;

  useEffect(() => {
    const getUserPayDay = async () => {
      const userPayDay = await getPayDay(userId);
      userPayDay ? setPayDay(userPayDay.payDay) : setPayDay(null);
    };
    getUserPayDay();
  }, [user]);

  let totalPay: number | string =
    payData.baseSalary +
    payData.weeklyHolidayAllowance +
    payData.additionalAllowance -
    (payData.nationalPension + payData.healthInsurance + payData.longTermCare + payData.employmentInsurance);

  totalPay = totalPay.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const today = new Date();
  const currentDate = Number(new Date(today).toISOString().substring(6, 7));

  let text = '';
  if (month === currentDate || month === currentDate - 1) {
    text = '예정';
  } else {
    text = '완료';
  }

  return (
    <li css={liItem}>
      {openModalName === name ? (
        <SpacificationModal
          id={id}
          payData={payData}
          name={name}
          totalPay={totalPay}
          onSpacificationModal={onSpacificationModal}
          handleAdditionalPay={handleAdditionalPay}
          addSalaryCorrectionList={addSalaryCorrectionList}
          month={month}
          isNull={isNull}
          errText={errText}
        />
      ) : null}
      <p>
        {month}월 {name} 급여명세서
      </p>
      <p css={{ color: '#666' }}>
        2024 {month}월 {payDay}일 지급 {text}
      </p>
      <p css={{ color: '#ff3737', width: '100px' }}>{totalPay}원</p>
      {viewedPm ? (
        <button css={readBtn} onClick={() => onSpacificationModal(name)}>
          열람
        </button>
      ) : (
        <button
          css={unreadBtn}
          onClick={() => {
            onSpacificationModal(name);
            handleIsViewd(id, name, month);
          }}
        >
          미열람
        </button>
      )}
    </li>
  );
};

export default PayList;

const liItem = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: var(--shadow-default);
  border-radius: var(--border-radius-medium);
  width: 100%;
  height: 65px;
  margin-bottom: 10px;
  p {
    text-align: center;
  }
`;
const unreadBtn = css`
  width: 90px;
  height: 30px;
  border: 1px solid #dceeff;
  border-radius: var(--border-radius-small);
  color: #578aea;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #578aea;
  }
`;
const readBtn = css`
  width: 90px;
  height: 30px;
  border: 1px solid #e6e6e6;
  border-radius: var(--border-radius-small);
  color: #888;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
  }
`;
