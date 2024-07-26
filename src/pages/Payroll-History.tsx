/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';

interface SalaryCorrection {
  name: string;
  monthly: string;

  title: string;
  content: string;
}
interface employeeSalaryType {
  id: number;
  name: string;

  pay: string;
}

const PayList = ({ id, name, pay }: employeeSalaryType) => {
  return (
    <li css={li}>
      <p>6월 {name} 급여명세서</p>
      <p css={{ color: '#666' }}>2024.07.15 지급 예정</p>
      <p css={{ color: '#ff3737' }}>{pay}</p>
      {id <= 2 ? <button css={unreadBtn}>미열람</button> : <button css={readBtn}>열람</button>}
    </li>
  );
};

const Item = ({ name, monthly, title, content }: SalaryCorrection) => {
  return (
    <tr css={{ color: '#666', height: '55px' }}>
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
const PayrollHistory: React.FC = () => {
  const [salaryCorrectionLists, setSalaryCorrectionLists] = useState<SalaryCorrection[]>([
    {
      name: '김수민',
      monthly: '6월',
      title: '연장근무 미반영',
      content: '6월 22일 주말피크 2시간 연장근무 급여 누락 된 것 습니다.',
    },
    {
      name: '양해석',
      monthly: '6월',
      title: '추가근무 미반영',
      content: '5월 15일 수민님 대타 출근한 4시간 급여 누락되었습니다.',
    },
    {
      name: '임효정',
      monthly: '2월',
      title: '무급휴가 사용 미반영',
      content: '2월27일 무급 휴가 사용한거 반영이 안되었습니다!',
    },
    {
      name: '김승민',
      monthly: '1월',
      title: '연장근무 미 반영',
      content: '1월 1일 연장근무 4시간 급여 누락 된 것 습니다.',
    },
  ]);
  const [employeeSalary, setEmployeeSalary] = useState<employeeSalaryType[]>([
    {
      id: 1,
      name: '김수민',
      pay: '2,400,000원',
    },
    {
      id: 2,
      name: '양해석',
      pay: '2,400,000원',
    },
    {
      id: 3,
      name: '임효정',
      pay: '2,400,000원',
    },
    {
      id: 4,
      name: '김승민',
      pay: '2,400,000원',
    },
    {
      id: 5,
      name: '강동원',
      pay: '2,200,000원',
    },
    {
      id: 6,
      name: '김우빈',
      pay: '2,200,000원',
    },
  ]);

  return (
    <div css={salaryCorrectionArea}>
      <div css={salaryCorrectionheader}>
        <h3>직원 급여 내역</h3>
        <div>
          <select id={'day'} css={select}>
            <option value="2024 6월">2024 6월</option>
            <option value="2024 5월">2024 5월</option>
            <option value="2024 4월">2024 4월</option>
            <option value="2024 3월">2024 3월</option>
          </select>
        </div>
      </div>
      <ul css={{ padding: 0, width: '100%' }}>
        {employeeSalary.map((item, index) => (
          <PayList key={index} id={item.id} name={item.name} pay={item.pay} />
        ))}
      </ul>
      <div css={salaryCorrectionheader}>
        <h3>급여 정정 요청 내역</h3>
        <div>
          <button css={[headerBtn, gray]}>대기중</button>
          <button css={[headerBtn, blue]}>승인</button>
          <button css={[headerBtn, red]}>반려</button>
        </div>
      </div>
      <table css={table}>
        <thead>
          <tr css={{ height: '50px' }}>
            <td>요청자</td>
            <td>월</td>
            <td>정정 사유</td>
            <td>정정 내용</td>
            <td css={{ textAlign: 'center' }}>상태</td>
          </tr>
        </thead>
        <tbody css={tbody}>
          {salaryCorrectionLists.map((item, index) => (
            <Item key={index} name={item.name} monthly={item.monthly} title={item.title} content={item.content} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollHistory;

const salaryCorrectionArea = css`
  margin-top: 80px;
`;

const salaryCorrectionheader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;
const select = css`
  border: none;
  font-size: 16px;
  outline: none;
`;

const li = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 0.4rem 1.5rem -0.4rem rgba(10, 10, 20, 0.2);
  border-radius: 10px;
  width: 100%;
  height: 65px;
  margin-bottom: 10px;
  p {
    text-align: center;
  }
`;
const unreadBtn = css`
  width: 90px;
  height: 30px;
  border: 1px solid #dceeff;
  border-radius: 7px;
  color: #578aea;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #578aea;
  }
`;
const readBtn = css`
  width: 90px;
  height: 30px;
  border: 1px solid #e6e6e6;
  border-radius: 7px;
  color: #888;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
  }
`;
const corretionBtn = css`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(130%);
  }
`;
const headerBtn = css`
  width: 90px;
  height: 25px;
  border: none;
  border-radius: 7px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
`;
const gray = css`
  background-color: #e6e6e6;
  &:hover {
    background-color: #adadad;
  }
`;
const blue = css`
  background-color: #dceeff;
  &:hover {
    background-color: #70a0fb;
  }
`;
const red = css`
  background-color: #ffe6e6;
  &:hover {
    background-color: #fc8888;
  }
`;
const table = css`
  width: 100%;
  box-shadow: 0 0.4rem 1.5rem -0.4rem rgba(10, 10, 20, 0.2);
  border-radius: 5px 5px 0 0;
  padding: 10px 20px;
`;
const tbody = css`
  tr {
    box-shadow: 0 -1px rgba(10, 10, 20, 0.1);
    border: 1px solid #333;
  }
`;
