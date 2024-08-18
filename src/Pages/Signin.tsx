/** @jsxImportSource @emotion/react */
/* eslint-disable react/no-unknown-property */
import React, { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import signinPageImage from '../../public/images/signin_page_image.svg';
import workCheckLogo from '../../public/images/workcheck_logo_signin.svg';
import Button from '../Components/Button.tsx';
import triangle from '../../public/images/triangle.svg';
import { login } from '../API/Firebase/LoginRegister.ts';
import { useAuthContext } from '../Context/AuthContext.tsx';

const Signin: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (event?: React.FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      if (!employeeId || !password) {
        setErrorMessage('직원 ID와 비밀번호를 모두 입력해주세요.');
        setEmployeeId('');
        setPassword('');
        return;
      }

      if (employeeId.length !== 9) {
        setErrorMessage('직원 ID가 잘못 입력되었습니다. 다시 입력해주세요.');
        setEmployeeId('');
        setPassword('');
        return;
      }

      if (password.length < 8 || password.length > 30) {
        setErrorMessage('비밀번호는 8자 이상, 30자리 이하로 작성해주세요.');
        setPassword('');
        return;
      }

      try {
        const user = await login(employeeId, password);
        if (user) {
          setUser(user);
          navigate('/home');
        }
      } catch (error: any) {
        if (error.message === 'User not found') {
          setErrorMessage('존재하지 않는 계정입니다. 관리자에게 문의해주세요.');
        } else if (error.message === 'Invalid password') {
          setErrorMessage('로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다.');
        } else {
          setErrorMessage('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        setEmployeeId('');
        setPassword('');
      }
    },
    [employeeId, password, setUser, navigate],
  );

  const handleStoreCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const containerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--Linear, linear-gradient(336deg, #90b6ff -6.47%, #e8edff 93%));
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 10px;
    }
  `;

  const imageContainerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -100px;
    height: 100%;
    width: 40%;
    .signin-image {
      width: 90%;
      height: auto;
      margin-bottom: 30px;
    }
    .description {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0.3px;
      color: white;
      text-align: center;
    }
    .workcheck-logo {
      width: 65%;
      height: auto;
      margin: 20px 0;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin: 0;
      .signin-image {
        width: 60%;
      }
    }

    @media (max-width: 600px) {
      width: 100%;
      margin: 100px 0 0 0;

      .signin-image {
        width: 60%;
        margin-bottom: 0;
      }
      .description {
        font-weight: 400;
        font-size: var(--font-size-h6);
      }
      .workcheck-logo {
        margin: 5px 0 20px;
      }
    }
  `;

  const contentsContainerStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40px;
    width: 23%;
    height: 40%;
    background: white;
    border-radius: var(--border-radius-medium);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .triangle {
      position: absolute;
      top: 20%;
      left: -5%;
    }
    .login-header {
      margin-top: -20px;
      height: 100px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .signin-options {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 7px 0 20px;
    }
    .errorMessage {
      height: 1rem;
      line-height: 1rem;
      margin-bottom: 12px;
      font-size: 0.72rem;
      color: red;
      letter-spacing: -0.5px;
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: 400px;
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      max-width: 250px;
      min-height: 280px;
      margin: 0 0 100px;
      padding: 30px;

      .login-header {
        height: 70px;
      }
      .signin-options {
        margin: 7px 0 10px;
      }
    }
  `;

  const inputContainerStyle = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  `;

  const inputStyle = css`
    width: 95%;
    height: 48px;
    border: 1.5px solid var(--whitegray, #ddd);
    outline: none;
    padding: 0 10px;
    margin: 10px 0;
    border-radius: 10px;
    &:hover {
      border: 1.5px solid var(--text-blue);
      transition: 0.3s;
    }

    @media (max-width: 600px) {
      margin: 5px;
    }
  `;

  return (
    <div css={containerStyle}>
      <div css={imageContainerStyle}>
        <img src={signinPageImage} alt="로그인 페이지 이미지" className="signin-image" />
        <p className="description">급여 및 스케줄 관리 플랫폼</p>
        <img src={workCheckLogo} alt="근무 로고" className="workcheck-logo" />
      </div>
      <form css={contentsContainerStyle} onSubmit={handleLogin}>
        <img src={triangle} alt="삼각형" className="triangle" />
        <div className="login-header">
          <h1>LOGIN</h1>
        </div>
        <div css={inputContainerStyle}>
          <input
            css={inputStyle}
            type="text"
            placeholder="직원 아이디 입력"
            value={employeeId}
            onChange={handleStoreCodeChange}
          />
          <input
            css={inputStyle}
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="signin-options">
          <div>
            <input type="checkbox" />
            <span style={{ fontSize: '12px', color: 'var(--text-light-gray)', margin: '7px', cursor: 'pointer' }}>
              자동 로그인
            </span>
          </div>
          <span
            style={{
              textDecoration: 'underline',
              fontSize: '12px',
              color: 'var(--text-light-gray)',
              cursor: 'pointer',
            }}
          >
            비밀번호 변경하기
          </span>
        </div>
        <p className="errorMessage">{errorMessage || ''}</p>
        <Button type="submit" customWidth="100%" customBorderRadius="10px">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Signin;
