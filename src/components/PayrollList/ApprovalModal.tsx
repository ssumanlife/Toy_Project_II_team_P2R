/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const ApprovalModal = ({ handleApproval }) => {
  return (
    <div css={ApprovalModalWrapper}>
      <div css={ApprovalModalpage}>
        <p css={{ fontSize: '20px' }}>승인 하시겠습니까?</p>
        <div>
          <button onClick={() => handleApproval()}>예</button>
          <button>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;

const ApprovalModalWrapper = css`
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
const ApprovalModalpage = css`
  width: 250px;
  height: 180px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px 20px 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
`;
