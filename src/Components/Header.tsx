/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import workCheckLogo from '../../public/images/workcheck-logo-header.svg';
import check from '../../public/images/check_logo.svg';
import logout from '../../public/icons/logout.svg';
import { useAuthContext } from '../Context/AuthContext.tsx';

const headerStyles = css`
  background-color: #f8f9fa;
  padding: 0 4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    padding: 0 2rem;
  }
`;

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .logo-img {
    width: 250px;
    height: auto;
  }

  @media (max-width: 1000px) {
    .logo-style {
      width: 300px;
    }
    .logo-img {
      width: 200px;
      height: auto;
    }
    .logo-v {
      width: 35px;
      height: auto;
    }
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
  padding: 0.3rem 1rem;
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

const logoutButtonStyles = css`
  border-radius: 10px;
  border: 1px solid rgba(215, 215, 215, 0.9);
  box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
  padding: 7px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  &:hover {
    color: #0056b3;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const emptyDivStyle = css`
  height: 76px;
  width: 100%;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <div css={emptyDivStyle} />
      <header css={headerStyles}>
        <div css={containerStyles}>
          <div>
            <img src={workCheckLogo} alt="logo" className="logo-img" />
            <img src={check} alt="logo" className="logo-v" />
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
                  일정 관리
                </button>
              </li>
              {user?.isAdmin && (
                <li>
                  <button css={buttonStyles} onClick={() => navigate('/employees')}>
                    직원 리스트
                  </button>
                </li>
              )}
              <li>
                <button css={buttonStyles} onClick={() => navigate('/payroll')}>
                  {user?.isAdmin ? '직원 급여 내역' : '급여 내역'}
                </button>
              </li>
            </ul>
          </nav>
          <div css={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: '10000' }}>
            {user?.name} 님
            <button css={logoutButtonStyles} onClick={handleLogout}>
              <img src={logout} alt="로그아웃 버튼" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
