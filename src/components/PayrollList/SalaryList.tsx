/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext.tsx';

interface SalaryListProps {
  id: number;
  name: string;
  month: number;
  reasonForApplication: string;
  correctionDetails: string;
  onYesNoModal: (btnId: string) => void;
  correctionState: string;
  deleteSalaryCorrection: (id: number, name: string, month: number, correctionDetails: string) => void;
}

const SalaryList: React.FC<SalaryListProps> = ({
  id,
  name,
  month,
  reasonForApplication,
  correctionDetails,
  onYesNoModal,
  correctionState,
  deleteSalaryCorrection,
}) => {
  const [contentDisplay, setContentDisplay] = useState(false);
  const { user } = useAuthContext();

  const handleContentDisplay = () => {
    contentDisplay ? setContentDisplay(false) : setContentDisplay(true);
  };

  let chkBtn: React.ReactNode = null;
  if (correctionState === 'standBy') {
    if (user?.isAdmin === false) {
      chkBtn = (
        <>
          <div css={[standByState, { paddingLeft: 0 }]}> 대기중 </div>
          <button
            css={[stateCheckBtn, employee]}
            onClick={() => deleteSalaryCorrection(id, name, month, correctionDetails)}
          >
            <span css={{ color: '#888' }} className="material-symbols-outlined">
              close
            </span>
          </button>
        </>
      );
    } else {
      chkBtn = (
        <>
          <button id={'v' + id} css={stateCheckBtn} onClick={() => onYesNoModal('v' + id)}>
            <span css={{ color: '#578AEA' }} className="material-symbols-outlined">
              check
            </span>
          </button>
          <button id={'x' + id} css={stateCheckBtn} onClick={() => onYesNoModal('x' + id)}>
            <span css={{ color: '#888' }} className="material-symbols-outlined">
              close
            </span>
          </button>
        </>
      );
    }
  } else if (correctionState === 'approval') {
    chkBtn = <div css={approvalState}> 승인 </div>;
  } else if (correctionState === 'reject') {
    chkBtn = <div css={rejectState}> 반려 </div>;
  }

  const contentBox = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    max-height: 100px;
    line-height: 29px;
    padding: 5px 0;
    cursor: pointer;
    & .changeDisplay {
      display: ${contentDisplay ? '-webkit-box' : 'contents'};
    }
  `;

  return (
    <tr css={tr}>
      <td css={{ paddingLeft: '60px' }}>{name}</td>
      <td>24년 0{month}월</td>
      <td>{reasonForApplication}</td>
      <td>
        <div css={contentBox}>
          <p onClick={() => handleContentDisplay()} className="changeDisplay">
            {correctionDetails}
          </p>
        </div>
      </td>
      <td css={stateArea}>{chkBtn ? chkBtn : null}</td>
    </tr>
  );
};

export default SalaryList;

const stateCheckBtn = css`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 5px;
  &:hover {
    transform: scale(130%);
  }
`;

const employee = css`
  position: absolute;
  right: 10px;
  margin-top: 2px;
  span {
    font-size: 20px;
  }
`;

const tr = css`
  color: #666;
  height: 55px;
  td {
    border-top: 1px solid #eeeeee;
    vertical-align: middle;
    position: relative;
  }
`;
const stateArea = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  text-align: center;
  position: relative;
`;

const approvalState = css`
  width: 90px;
  height: 25px;
  border-radius: var(--border-radius-small);
  color: #333;
  background-color: #dceeff;
  padding-top: 5px;
  font-size: 14px;
  box-sizing: border-box;
  &:hover {
    background-color: #70a0fb;
  }
`;
const rejectState = css`
  width: 90px;
  height: 25px;
  border-radius: var(--border-radius-small);
  color: #333;
  background-color: #ffe6e6;
  padding-top: 5px;
  font-size: 14px;
  box-sizing: border-box;
  &:hover {
    background-color: #fc8888;
  }
`;
const standByState = css`
  width: 90px;
  height: 25px;
  border-radius: var(--border-radius-small);
  color: #333;
  font-size: 14px;
  background-color: #e6e6e6;
  padding-top: 5px;
  box-sizing: border-box;
  &:hover {
    background-color: #adadad;
  }
`;
