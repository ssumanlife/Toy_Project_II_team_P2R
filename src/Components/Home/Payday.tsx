/* eslint-disable no-restricted-globals */
/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '../Button.tsx';
import Polygon1 from '../../../public/images/Polygon 1.svg';
import Polygon2 from '../../../public/images/Polygon 2.svg';
import { getPayDay, updatePayDay } from '../../API/Firebase/Payday.ts';
import { useAuthContext } from '../../Context/AuthContext.tsx';

const contentContainerStyle = css`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 304px;
  height: 95%;
  flex-shrink: 0;
  border-radius: var(--border-radius-medium);
  background: #f7f9fc; /* 연한 색상 */
  box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);

  .content-wrapper {
    width: 275px;
    height: 95%;
    border-radius: var(--border-radius-medium);
    background: var(--background-main, #fff);
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    z-index: 20;
    h2 {
      position: absolute;
      font-size: 20px;
      font-weight: 1000;
    }
    h2:nth-of-type(1) {
      top: 25px;
    }
    h2:nth-of-type(2) {
      top: 65px;
      input,
      span {
        color: var(--primary-blue, #2f80ed);
        font-size: 20px;
        font-weight: 1000;
      }
      input {
        width: 30px;
        border: none;
        border-bottom: 2px solid var(--primary-blue, #2f80ed);
        text-align: center;
        outline: none;
        background: transparent; /* 배경 투명하게 설정 */
      }
    }
    button {
      margin-top: -20px;
      z-index: 22; /* 버튼이 이미지 위로 올라오도록 z-index를 높게 설정 */
    }
  }

  img {
    position: absolute;
    z-index: 21; /* 기본 이미지의 z-index를 낮게 설정 */
    pointer-events: none; /* 이미지 클릭 불가능하도록 설정 */
    &:nth-of-type(1) {
      bottom: -10px;
      left: 5px;
    }
    &:nth-of-type(2) {
      right: -28px;
      bottom: 0;
      width: 215.64px;
      height: 180px;
      flex-shrink: 0;
    }
    &:nth-of-type(3) {
      transform: scaleX(-1);
      left: -28px;
      bottom: 0;
      width: 215.64px;
      height: 174.5px;
      flex-shrink: 0;
    }
  }
`;

const errorMessageStyle = css`
  margin-bottom: 25px;
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const Payday: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [payday, setPayday] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPayDay = async () => {
      if (user) {
        const payDayData = await getPayDay(user.employeeId);
        if (payDayData) {
          setPayday(payDayData.payDay);
        }
      }
    };

    fetchPayDay();
  }, [user]);

  const handleButtonClick = async () => {
    if (isEditing) {
      const paydayNumber = parseInt(payday, 10);
      if (!/^\d+$/.test(payday) || isNaN(paydayNumber) || paydayNumber <= 0 || paydayNumber > 31) {
        setError('유효한 날짜를 입력하세요 (1-31)');
        return;
      }
      setError('');
      setIsEditing(false);

      if (user) {
        await updatePayDay(payday);
      }
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayday(e.target.value);
  };

  return (
    <div css={contentContainerStyle}>
      <div className="content-wrapper">
        <h2>우리 가게의 월급날은</h2>
        <h2>
          매월{' '}
          {isEditing ? (
            <input ref={inputRef} type="text" placeholder={payday} defaultValue={payday} onChange={handleInputChange} />
          ) : (
            <span>{payday}</span>
          )}
          일
        </h2>
        {error && <div css={errorMessageStyle}>{error}</div>}
        {user?.isAdmin && (
          <Button
            type="button"
            customWidth="80px"
            customHeight="30px"
            customFontSize="14px"
            onClick={handleButtonClick}
          >
            {isEditing ? '저장하기' : '수정하기'}
          </Button>
        )}
      </div>
      <img src={Polygon1} alt="Polygon 1" />
      <img src={Polygon2} alt="Polygon 2" />
      <img src={Polygon2} alt="Polygon 3" />
    </div>
  );
};

export default Payday;
