/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import MyCalendar from '../Components/Calendar/Calendar.tsx';
import { Payday } from '../Components/Home/Payday.tsx';
import PayrollCorrection from '../Components/Home/PayrollCorrection.tsx';
import { Dday } from '../Components/Home/Dday.tsx';
import { useAuthContext } from '../Context/AuthContext.tsx';

const Home: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <div css={layoutStyle}>
      <div css={calendarContainerStyle}>
        <MyCalendar />
      </div>
      <div css={sideContainerStyle}>
        <div css={[itemStyle, !user?.isAdmin && adminHeightStyle]}>
          <Payday />
        </div>
        <div css={[itemStyle, !user?.isAdmin && userHeightStyle]}>
          {user?.isAdmin ? <PayrollCorrection /> : <Dday />}
        </div>
      </div>
    </div>
  );
};

export default Home;

const layoutStyle = css`
  box-sizing: border-box;
  height: calc(100vh - 176px);
  width: 100%;
  max-width: 1280px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 10px 40px 300px 10px rgba(215, 215, 215, 0.5);
`;

const calendarContainerStyle = css`
  flex: 5;
  border-radius: 20px;
  box-shadow: 10px 40px 300px 10px rgba(215, 215, 215, 0.5);
`;

const sideContainerStyle = css`
  margin-left: 50px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const itemStyle = css`
  position: relative;
  height: 48%;
  border-radius: 20px;
  background: var(--whitefff, #fff);
  box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
`;

const adminHeightStyle = css`
  height: 58%;
`;

const userHeightStyle = css`
  height: 38%;
`;
