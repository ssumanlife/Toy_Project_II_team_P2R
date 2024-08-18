/* eslint-disable no-restricted-globals */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const Error: React.FC = () => (
  <div css={errorContainer}>
    <iframe
      css={error}
      title="404"
      src="https://lottie.host/embed/7fb5cb85-09d8-4407-8715-4e8a3e3a88f0/X3QO2NorzY.json"
    />
    <button css={btn} onClick={() => history.back()}>
      GO BACK
    </button>
  </div>
);

export default Error;

const errorContainer = css`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const error = css`
  height: 30vh;
  width: 30vw;
  border: none;
`;

const btn = css`
  left: 19%;
  bottom: 23%;
  width: 15vw;
  min-width: 110px;
  height: 5vh;
  border-radius: 30px;
  border: none;
  background-color: rgb(38, 91, 255);
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-top: 50px;
  cursor: pointer;
`;
