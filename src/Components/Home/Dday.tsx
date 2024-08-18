/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import firework from '../../../public/images/firework.png';
import { getPayDay } from '../../API/Firebase/Payday.ts';
import { useAuthContext } from '../../Context/AuthContext.tsx';

export const Dday: React.FC = () => {
  const [dDay, setDDay] = useState<number | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const calculateDDay = async () => {
      if (user) {
        const payDayData = await getPayDay(user.employeeId);
        if (payDayData && payDayData.payDay) {
          const paydayDate = parseInt(payDayData.payDay, 10);

          const today = new Date();
          const currentMonth = today.getMonth();
          const currentYear = today.getFullYear();

          const payday = new Date(currentYear, currentMonth, paydayDate);
          if (payday < today) {
            payday.setMonth(currentMonth + 1);
          }

          const diffTime = Math.ceil((payday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          setDDay(diffTime);
        }
      }
    };

    calculateDDay();
  }, [user]);

  return (
    <div css={contentContainerStyle}>
      <div css={contentWrapperStyle}>
        <h2>월급날까지</h2>
        <h2>{dDay !== null ? `D-${dDay}` : 'Loading...'}</h2>
      </div>
      <img css={imageStyle} src={firework} alt="Firework" />
    </div>
  );
};

const contentContainerStyle = css`
  width: 400px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 20px;
  background: linear-gradient(185deg, #a1c6fd 8.58%, #5988ff 87.93%);
  box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const contentWrapperStyle = css`
  margin-left: 100px;
  text-align: center;
  h2 {
    color: var(--whitefff, #fff);
    line-height: 16px;
  }
  h2:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.96px;
    margin-bottom: 35px;
  }
  h2:nth-of-type(2) {
    font-size: 56px;
    font-weight: 700;
    letter-spacing: 2.56px;
  }
`;

const imageStyle = css`
  position: absolute;
  top: 10px;
  left: 0;
  width: 40%;
  height: 90%;
`;

export default Dday;
