/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { PayData } from '../../Pages/Payroll/Payroll-History.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import SpacificationModal from './SpacificationModal.tsx';

interface PayListProps {
  id: number;
  name: string;
  payData: PayData;
  handleAdditionalPay: (inputValue: string | undefined, id: number, name: string, month: number) => void;
  isViewed: boolean;
  handleIsViewd: (id: number, name: string, month: number) => void;
  addSalaryCorrectionList: (name: string, reason: string, textareaValue: string | undefined) => void;
  month: number;
  isNull: boolean;
  spacificationModal: boolean;
  onSpacificationModal: () => void;
  adminViewed: boolean;
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
  spacificationModal,
  onSpacificationModal,
  adminViewed,
}) => {
  const { user } = useAuthContext();
  const viewedPm = user?.isAdmin ? adminViewed : isViewed;

  let totalPay =
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
      {spacificationModal ? (
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
        />
      ) : null}
      <p>
        {month}월 {name} 급여명세서
      </p>
      <p css={{ color: '#666' }}>
        2024 {month}월 15일 지급 {text}
      </p>
      <p css={{ color: '#ff3737', width: '100px' }}>{totalPay}원</p>
      {viewedPm ? (
        <button css={readBtn} onClick={onSpacificationModal}>
          열람
        </button>
      ) : (
        <button
          css={unreadBtn}
          onClick={() => {
            onSpacificationModal();
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
