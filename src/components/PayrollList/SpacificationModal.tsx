/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef } from 'react';
import Button from '../Button.tsx';

const SpacificationModal = ({ id, payData, onSpacificationModal, name, totalPay, handleAdditionalPay }) => {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef = useRef(null);

  const handleReadOnly = () => {
    readOnly ? setReadOnly(false) : setReadOnly(true);
    // readOnly ? null : handleAdditionalPay(inputRef.current.value, id);
  };
  // 총 지급액
  let sumPay = (payData.basicPay + payData.weeklyPay + payData.additionalPay)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 총 공제액
  let deductionPay = (payData.nationalPension + payData.healthInsurance + payData.care + payData.employmentInsurance)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 그 외 나머지 pay
  let payArr = [];
  for (let i = 0; i < Object.values(payData).length; i++) {
    payArr.push(
      Object.values(payData)
        [i].toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
  }

  const ulArea = css`
    width: 80%;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      input {
        width: 120px;
        height: 20px;
        border: none;
        text-align: right;
        color: #333;
        font-size: 16px;
        outline: none;
      }
      & .edit {
        border-bottom: ${readOnly ? 'none' : '3px solid #c1c1c1'};
      }
    }
  `;
  // console.log(inputRef.current.value);
  return (
    <div css={spacificationModalWrapper}>
      <div css={spacificationModalpage}>
        <div css={modalTop}>
          <h3 css={{ color: '#578aea' }}>2024년 8월 {name} 급여명세서</h3>
          <button css={closeBtn} onClick={() => onSpacificationModal()}>
            <span css={{ color: '#888', fontSize: '36px' }} className="material-symbols-outlined">
              close
            </span>
          </button>
        </div>

        <div css={listWrapper}>
          <ul css={ulArea}>
            <li>
              <p>급여 지급예정일</p>
              <p>2024.08.15</p>
            </li>
            <li>
              <p>성명</p>
              <p>{name}</p>
            </li>
            <li>
              <p>급여 계좌</p>
              <p>하나 478964312312856</p>
            </li>
          </ul>
          <ul css={ulArea}>
            <li>
              <p>기본급</p>
              <input value={payArr[0] + '원'} readOnly />
            </li>
            <li>
              <p>주휴수당</p>
              <input value={payArr[1] + '원'} readOnly />
            </li>
            <li>
              <p>추가수당</p>
              <div className="edit">
                <input ref={inputRef} defaultValue={payArr[2]} readOnly={readOnly} />원
              </div>
            </li>
            <li css={{ fontSize: '18px', fontWeight: '500' }}>
              <p>총지급액</p>
              <p>{sumPay}원</p>
            </li>
          </ul>
          <ul css={ulArea}>
            <li>
              <p>국민연금</p>
              <input value={payArr[3] + '원'} readOnly />
            </li>
            <li>
              <p>건강보험</p>
              <input value={payArr[4] + '원'} readOnly />
            </li>
            <li>
              <p>장기요양</p>
              <input value={payArr[5] + '원'} readOnly />
            </li>
            <li>
              <p>고용보험</p>
              <input value={payArr[6] + '원'} readOnly />
            </li>
            <li css={{ fontSize: '18px', fontWeight: '500' }}>
              <p>총공제액</p>
              <p>{deductionPay}원</p>
            </li>
          </ul>
          <ul css={ulArea}>
            <li css={{ fontSize: '20px', fontWeight: '700' }}>
              <p>실지급액</p>
              <p>{totalPay}원</p>
            </li>
          </ul>
          <div css={{ margin: '20px 0' }}>
            {readOnly ? (
              <Button onClick={() => handleReadOnly()} children={'급여 수정'} variant="secondary" />
            ) : (
              <Button
                onClick={() => {
                  handleReadOnly();
                  handleAdditionalPay(inputRef.current.value, id);
                }}
                children={'수정 완료'}
                variant="primary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacificationModal;

const spacificationModalWrapper = css`
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const spacificationModalpage = css`
  width: 560px;
  height: 700px;
  display: flex;
  flex-direction: column;
  background: #dceeff;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
`;
const modalTop = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const closeBtn = css`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  right: 20px;
  &:hover {
    transform: scale(130%);
  }
`;
const listWrapper = css`
  width: 520px;
  height: 600px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
