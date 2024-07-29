/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
interface SalaryCorrection {
  id: string;
  name: string;
  monthly: string;
  title: string;
  content: string;
  onModal: any;
}

const SalaryList = ({ id, name, monthly, title, content, onModal }: SalaryCorrection) => {
  const [result, setResult] = useState([{ check: 'check', close: 'close' }]);

  return (
    <tr css={tr}>
      <td>{name}</td>
      <td>24년 0{monthly}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td css={{ textAlign: 'center' }}>
        <button id={id} css={stateCheckBtn} onClick={() => onModal()}>
          <span css={{ color: '#578AEA' }} className="material-symbols-outlined">
            {result[0].check}
          </span>
        </button>
        <button id={id} css={stateCheckBtn}>
          <span css={{ color: '#888' }} className="material-symbols-outlined">
            {result[0].close}
          </span>
        </button>
      </td>
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
