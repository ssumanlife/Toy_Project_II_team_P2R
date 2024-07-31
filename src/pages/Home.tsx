/** @jsxImportSource @emotion/react */
import React from 'react';
import MyCalendar from '../Components/Calendar/Calendar';
import { css } from '@emotion/react';

const Home: React.FC = () => (
  <div css={layoutStyle}>
    <div css={calendarContainerStyle}>
      <MyCalendar />
    </div>
    <div css={sideContainerStyle}>
      <div css={itemStyle}>영역1</div>
      <div css={itemStyle}>영역2</div>
    </div>
  </div>
);

export default Home;

const layoutStyle = css`
  height: 60vw;
  width: 99vw;
  display: flex;
  flex-direction: row;
  border: 1px solid;
`;

const calendarContainerStyle = css`
  flex: 3;
  height: 100%;
  border: 1px solid;
`;

const sideContainerStyle = css`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid;
`;

const itemStyle = css`
  flex: 1;
  height: 50%;
  border: 1px solid;
`;
