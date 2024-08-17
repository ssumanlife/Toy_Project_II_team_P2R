/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

const selectBox = css`
  position: relative;
  width: 140px;
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
    z-index: 1000;
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
    overflow-y: auto;
    max-height: 0;
    transition: max-height 0.3s ease-in;
    z-index: 999;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-blue);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #2a63d1;
    }
  }

  &.active .optionList {
    max-height: 150px;
    border-color: var(--primary-blue);
    z-index: 1000;
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

interface SelectProps {
  options: string[];
  defaultLabel: string;
  onSelect: (option: string) => void;
  className?: string;
  css?: any;
}

const Select: React.FC<SelectProps> = ({ options, defaultLabel, onSelect, className, css }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultLabel);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div css={[selectBox, css]} className={`${className} ${isOpen ? 'active' : ''}`}>
      <div className="label" onClick={toggleDropdown}>
        <span>{selected}</span>
        <span css={{ position: 'absolute', right: '5px' }}>▾</span>
      </div>
      <ul className="optionList">
        {options.map((option, index) => (
          <li key={index} className="optionItem" onClick={() => selectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
