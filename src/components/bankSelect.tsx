/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { valueStyles } from '../Pages/EmployeeList/EmployeeSpecificModal';

const selectBox2 = css`
  position: relative;
  width: 150px;
  height: 35px;
  border: none;
  cursor: pointer;
  color: var(--text-gray);

  &:after {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 35px;
  }


  .label {
    ${valueStyles}
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 5px;
    background: transparent;
    cursor: pointer;
    font-weight: var(--font-weight-medium);
  }

  .optionList {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    justify-content: center;
    background: var(--background-main);
    color: var(--text-gray);
    list-style-type: none;
    border: 1px solid #d9d9d9; 
    border-radius: 4px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in;
    z-index: 1;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 45px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #303030;
    }
  }

  &.active .optionList {
    max-height: 300px;
    border-color: var(--primary-blue);
  }

  .optionItem {
    padding: 8px 20px;
    transition: background 0.1s;


    &:hover {
      color: var(--text-blue);
    }

    &:last-child {
      border-bottom: 0 none;
    }
  }
`;

const BankSelectComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('은행 선택');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div css={selectBox2} className={isOpen ? 'active' : ''}>
      <div className="label" onClick={toggleDropdown}>
        <span>{selected}</span>
        <span css={{ position: 'absolute', right: '5px' }}>▾</span>
      </div>
      <ul className="optionList">
        {['국민', '농협', '하나', '카카오뱅크'].map((option, index) => (
          <li key={index} className="optionItem" onClick={() => selectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankSelectComponent;
