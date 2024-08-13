/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import getStandByNames from '../../API/Firebase/GetCorrectionData.ts';

const PayrollCorrection: React.FC = () => {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const names = await getStandByNames();
      const formattedData = names.map((name, index) => ({ id: index + 1, name }));
      setData(formattedData);
    };

    fetchData();
  }, []);

  const handleDivClick = () => {
    navigate('/payroll');
  };

  return (
    <div css={styles.container}>
      <p>급여 정정 요청 내역</p>
      {data.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div css={styles.item} key={item.id} onClick={handleDivClick} role="button" tabIndex={0}>
          <span>{item.name}</span>
          <span>대기 중</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: css`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      color: var(--font-black, #585858);
      font-family: 'Noto Sans KR';
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 40px; /* 250% */
      letter-spacing: -0.64px;
      border-bottom: 1px solid #ccc;
    }
  `,
  item: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 3px;
    border-radius: 5px;
    background-color: #f9f9f9;
    cursor: pointer;
    height: 30px;
    &:hover {
      background-color: #e9e9e9;
      transition: 0.3s;
    }
    span:nth-of-type(2) {
      font-size: 12px;
      // font-weight: 600;
  `,
};

export default PayrollCorrection;
