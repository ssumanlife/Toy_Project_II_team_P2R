/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import workcheck from '../../public/images/workcheck_logo.png';
import check from '../../public/images/check_logo.svg';
import logout from '../../public/icons/logout.svg';
import { useAuthContext } from '../Context/AuthContext.tsx';

const headerStyles = css`
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  padding-right: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const listStyles = css`
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

const buttonStyles = css`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: #373f41;
  &:hover {
    color: #0056b3;
  }
  &:focus {
    outline: none;
  }
`;

const loginoutButtonStyles = css`
  border-radius: 10px;
  box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
  padding: 7px;
  margin-left: 10px;
  &:hover {
    color: #0056b3;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <header css={headerStyles}>
      <div css={containerStyles}>
        <div>
          <img src={workcheck} alt="logo" />
          <img src={check} alt="logo" />
        </div>
        <nav>
          <ul css={listStyles}>
            <li>
              <button css={buttonStyles} onClick={() => navigate('/home')}>
                홈
              </button>
            </li>
            <li>
              <button css={buttonStyles} onClick={() => navigate('/schedule')}>
                일정관리
              </button>
            </li>
            <li>
              <button css={buttonStyles} onClick={() => navigate('/employees')}>
                직원리스트
              </button>
            </li>
            <li>
              <button css={buttonStyles} onClick={() => navigate('/payroll')}>
                직원급여내역
              </button>
            </li>
          </ul>
        </nav>
        <div>
          {user?.name} 님
          <button css={loginoutButtonStyles}>
            <img src={logout} alt="로그아웃 버튼" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
