/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
interface SalaryCorrection {
  name: string;
  monthly: string;

  title: string;
  content: string;
}

const SalaryList = ({ name, monthly, title, content }: SalaryCorrection) => {
  return (
    <tr css={tr}>
      <td>{name}</td>
      <td>24년 0{monthly}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td css={{ textAlign: 'center' }}>
        <button css={corretionBtn}>
          <span css={{ color: '#578AEA' }} className="material-symbols-outlined">
            check
          </span>
        </button>
        <button css={corretionBtn}>
          <span css={{ color: '#888' }} className="material-symbols-outlined">
            close
          </span>
        </button>
      </td>
    </tr>
  );
};

export default SalaryList;

const corretionBtn = css`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
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
