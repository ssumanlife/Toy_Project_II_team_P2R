/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import firework from '../../../public/images/firework.png';

// eslint-disable-next-line import/prefer-default-export
export const Dday: React.FC = () => (
  <div css={contentContainerStyle}>
    <div css={contentWrapperStyle}>
      <h2>월급날까지</h2>
      <h2>D-14</h2>
    </div>
    <img css={imageStyle} src={firework} alt="Firework" />
  </div>
);

const contentContainerStyle = css`
  width: 400px;
  height: 185px;
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
  h2: nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.96px;
    margin-bottom: 35px;
  }
  h2: nth-of-type(2) {
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
