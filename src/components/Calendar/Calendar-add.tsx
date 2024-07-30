/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal';
import Button from '../Button';

const categoryColors = {
  pink: 'var(--calendar-pink)',
  yellow: 'var(--calendar-yellow)',
  peach: 'var(--calendar-peach)',
  green: 'var(--calendar-green)',
  skyblue: 'var(--calendar-skyblue)',
  blue: 'var(--calendar-blue)',
  purple: 'var(--calendar-purple)',
  gray: 'var(--calendar-gray)',
};

const containerStyle = css`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const sectionStyle = css`
  margin-top: 50px;
`;

const labelStyle = css`
  font-size: 1.5em;
  display: block;
  margin-bottom: 10px;
`;

const inputStyle = css`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 8px;
  font-size: 2.5em;
  border: none;
  color: var(--text-gray);
  &:focus {
    outline: none;
  }
`;

const dateTimeContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const colorContainerStyle = css`
  display: flex;
  gap: 10px;
`;

const colorCircleStyle = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const selectedColorCircleStyle = css`
  &::after {
    content: '✓';
    color: white;
    font-size: 1.5em;
  }
`;

const buttonContainerStyle = css`
  margin-top: auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

const dateTimeInputStyle = css`
  padding: 8px;
  font-size: 1.5em;
  width: 45%;
  border: none;
  color: var(--text-gray);
  &:focus {
    outline: none;
  }
`;
const separatorStyle = css`
  font-size: 1.5em;
  color: var(--text-gray);
`;
const titleStyle = css`
  display: block;
  border-bottom: 1px solid var(--text-white-gray);
  padding-bottom: 20px;
`;

const CalendarAddModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={containerStyle}>
        <div css={titleStyle}>
          <h2>스케줄 추가</h2>
        </div>
        <div css={sectionStyle}>
          <label css={labelStyle}></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="일정 제목"
            css={inputStyle}
          />
        </div>
        <div css={sectionStyle}>
          <label css={labelStyle}>시간 설정</label>
          <div css={dateTimeContainerStyle}>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              css={dateTimeInputStyle}
            />
            <span css={separatorStyle}>-</span>
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              css={dateTimeInputStyle}
            />
          </div>
        </div>
        <div css={sectionStyle}>
          <label css={labelStyle}>컬러</label>
          <div css={colorContainerStyle}>
            {Object.entries(categoryColors).map(([colorKey, colorValue]) => (
              <div
                key={colorKey}
                onClick={() => setSelectedColor(colorKey)}
                css={[
                  colorCircleStyle,
                  { backgroundColor: colorValue },
                  selectedColor === colorKey && selectedColorCircleStyle,
                ]}
              />
            ))}
          </div>
        </div>
        <div css={buttonContainerStyle}>
          <Button onClick={onClose}>작성</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarAddModal;
