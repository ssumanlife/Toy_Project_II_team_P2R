/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import SalaryList from '../../Components/PayrollList/SalaryList.tsx';
import PayList from '../../Components/PayrollList/PayList.tsx';
import ApprovalModal from '../../Components/PayrollList/ApprovalModal.tsx';

const PayrollHistory = () => {
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
  const [modal, setModal] = useState(false);
  const [approval, setApproval] = useState(false);

  const handleApproval = () => {
    approval ? setModal(true) : setModal(false);
  };

  const onModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  return (
    <div css={wrapper}>
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
        <table css={listTable}>
          <thead>
            <tr css={trStyle}>
              <td>요청자</td>
              <td>월</td>
              <td>정정 사유</td>
              <td>정정 내용</td>
              <td css={{ textAlign: 'center' }}>상태</td>
            </tr>
          </thead>
          <tbody>
            {salaryCorrectionLists.map((item, index) => (
              <SalaryList
                key={index}
                id={index}
                name={item.name}
                monthly={item.monthly}
                title={item.title}
                content={item.content}
                approval={approval}
                onModal={onModal}
              />
            ))}
          </tbody>
        </table>
        {modal ? <ApprovalModal handleApproval={handleApproval} /> : null}
      </div>
    </div>
  );
};

export default PayrollHistory;
const wrapper = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const salaryCorrectionArea = css`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const salaryCorrectionheader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid #f0f0f0;
`;
const select = css`
  border: none;
  font-size: 16px;
  outline: none;
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
const listTable = css`
  width: 100%;
  box-shadow: 0 0.4rem 1.5rem -0.4rem rgba(10, 10, 20, 0.2);
  border-radius: 5px 5px 0 0;
`;
const trStyle = css`
  height: 50px;
  text-align: 'center';
  td {
    vertical-align: middle;
    padding-left: 15px;
  }
`;
