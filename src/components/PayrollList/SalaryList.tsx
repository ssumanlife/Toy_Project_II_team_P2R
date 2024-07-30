/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import { SalaryCorrection } from '../../Pages/Payroll/Payroll-History.tsx';

const SalaryList = ({ id, name, monthly, title, content, onModal, state }: SalaryCorrection) => {
  let chkBtn = {};

  if (state === 'normal') {
    chkBtn = (
      <>
        <button id={'v' + id} css={stateCheckBtn} onClick={() => onModal('v' + id)}>
          <span css={{ color: '#578AEA' }} className="material-symbols-outlined">
            check
          </span>
        </button>
        <button id={'x' + id} css={stateCheckBtn} onClick={() => onModal('x' + id)}>
          <span css={{ color: '#888' }} className="material-symbols-outlined">
            close
          </span>
        </button>
      </>
    );
  } else if (state === 'approval') {
    chkBtn = <div css={approvalState}> 승인 </div>;
  } else if (state === 'reject') {
    chkBtn = <div css={rejectState}> 반려 </div>;
  }

  return (
    <tr css={tr}>
      <td>{name}</td>
      <td>24년 0{monthly}</td>
      <td>{title}</td>
      <td>{content}</td>
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
const tr = css`
  color: #666;
  height: 55px;
  td {
    border-top: 1px solid #eeeeee;
    vertical-align: middle;
    padding-left: 15px;
  }
`;
const stateArea = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  text-align: center;
`;

const approvalState = css`
  width: 90px;
  height: 25px;
  border-radius: 7px;
  color: #333;
  background-color: #dceeff;
  padding-top: 5px;
  box-sizing: border-box;
  &:hover {
    background-color: #70a0fb;
  }
`;
const rejectState = css`
  width: 90px;
  height: 25px;
  border-radius: 7px;
  color: #333;
  background-color: #ffe6e6;
  padding-top: 5px;
  box-sizing: border-box;
  &:hover {
    background-color: #fc8888;
  }
`;
