/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import { SalaryCorrection } from '../../Pages/Payroll/Payroll-History.tsx';
import { useAuthContext } from '../../Context/AuthContext.tsx';

const SalaryList = ({
  id,
  name,
  monthly,
  title,
  content,
  onModal,
  state,
  deleteSalaryCorrection,
}: SalaryCorrection) => {
  const [contentDisplay, setContentDisplay] = useState(false);
  const { user } = useAuthContext();
  const handleContentDisplay = () => {
    contentDisplay ? setContentDisplay(false) : setContentDisplay(true);
  };

  let chkBtn = {};
  if (state === 'standBy') {
    if (user.isAdmin === false) {
      chkBtn = (
        <>
          <div css={[standByState, { paddingLeft: 0 }]}> 대기중 </div>
          <button css={[stateCheckBtn, employee]} onClick={() => deleteSalaryCorrection(id)}>
            <span css={{ color: '#888' }} className="material-symbols-outlined">
              close
            </span>
          </button>
        </>
      );
    } else {
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
    }
  } else if (state === 'approval') {
    chkBtn = <div css={approvalState}> 승인 </div>;
  } else if (state === 'reject') {
    chkBtn = <div css={rejectState}> 반려 </div>;
  }

  const contentBox = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    max-height: 100px;
    line-height: 26px;
    padding: 5px 0;
    & .changeDisplay {
      display: ${contentDisplay ? '-webkit-box' : 'contents'};
    }
  `;

  return (
    <tr css={tr}>
      <td>{name}</td>
      <td>24년 0{monthly}</td>
      <td>{title}</td>
      <td>
        <div css={contentBox}>
          <p onClick={() => handleContentDisplay()} className="changeDisplay">
            {content}
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
  right: 0;
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
    padding-left: 15px;
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
  padding-top: 7px;
  box-sizing: border-box;
  &:hover {
    background-color: #adadad;
  }
`;
