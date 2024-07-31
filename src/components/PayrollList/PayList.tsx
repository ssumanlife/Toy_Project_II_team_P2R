/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { EmployeeSalaryType } from '../../Pages/Payroll/Payroll-History.tsx';
import SpacificationModal from './SpacificationModal.tsx';
import { useState } from 'react';

const PayList = ({ id, name, payData, handleAdditionalPay, isViewd, handleIsViewd }: employeeSalaryType) => {
  const [modal, setModal] = useState(false);
  const onSpacificationModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  let totalPay =
    payData.basicPay +
    payData.weeklyPay +
    payData.additionalPay -
    (payData.nationalPension + payData.healthInsurance + payData.care + payData.employmentInsurance);

  totalPay = totalPay.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <li css={liItem}>
      {modal ? (
        <SpacificationModal
          id={id}
          payData={payData}
          name={name}
          totalPay={totalPay}
          onSpacificationModal={onSpacificationModal}
          handleAdditionalPay={handleAdditionalPay}
        />
      ) : null}
      <p>6월 {name} 급여명세서</p>
      <p css={{ color: '#666' }}>2024.07.15 지급 예정</p>
      <p css={{ color: '#ff3737', width: '100px' }}>{totalPay}원</p>
      {isViewd ? (
        <button css={unreadBtn} onClick={onSpacificationModal}>
          열람
        </button>
      ) : (
        <button
          css={readBtn}
          onClick={() => {
            onSpacificationModal();
            handleIsViewd(id);
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
  box-shadow: 0 0.4rem 1.5rem -0.4rem rgba(10, 10, 20, 0.2);
  border-radius: 10px;
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
  border-radius: 7px;
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
  border-radius: 7px;
  color: #888;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
  }
`;
