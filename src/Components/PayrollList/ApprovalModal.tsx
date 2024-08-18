/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Button from '../Button.tsx';

const btnWrapper = css`
  display: flex;
  gap: 20px;
`;

interface ApprovalModalProps {
  handleApproval: (btnId: string) => void;
  btnId: string;
  onYesNoModal: (btnId: string) => void;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ handleApproval, btnId, onYesNoModal }) => {
  let text = '';
  if (btnId.slice(0, 1) === 'v') {
    text = '승인';
  } else if (btnId.slice(0, 1) === 'x') {
    text = '반려';
  }
  return (
    <div css={ApprovalModalWrapper}>
      <div css={ApprovalModalpage}>
        <p css={{ fontSize: '20px', marginBottom: '60px', color: '#333' }}>{text} 하시겠습니까?</p>
        <div css={btnWrapper}>
          <Button onClick={() => handleApproval(btnId)} children={'예'} variant="primary" />
          <Button onClick={() => onYesNoModal(btnId)} children={'아니오'} variant="secondary" />
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
  width: 350px;
  height: 210px;
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
