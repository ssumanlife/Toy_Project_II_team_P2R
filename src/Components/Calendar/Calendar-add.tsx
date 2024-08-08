/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';

interface CategoryColors {
  [key: string]: string;
}

const categoryColors: CategoryColors = {
  pink: 'var(--calendar-pink)',
  yellow: 'var(--calendar-yellow)',
  peach: 'var(--calendar-peach)',
  green: 'var(--calendar-green)',
  skyblue: 'var(--calendar-skyblue)',
  blue: 'var(--calendar-blue)',
  purple: 'var(--calendar-purple)',
  gray: 'var(--calendar-gray)',
};

interface CalendarAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CalendarEvent) => void;
}
interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  category: string;
  name: string;
}

const CalendarAddModal: React.FC<CalendarAddModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const resetForm = () => {
    setTitle('');
    setStartDateTime('');
    setEndDateTime('');
    setSelectedColor('');
    setErrorMessage('');
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (): Promise<void> => {
    if (!title || !startDateTime || !endDateTime) {
      setErrorMessage('모든 필드를 입력해주세요');
      return;
    }

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (startDate > endDate) {
      setErrorMessage('일정시작이 일정종료 보다 늦을 수 없습니다.');
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      setErrorMessage('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const newEvent: CalendarEvent = {
      title,
      start: startDateTime,
      end: endDateTime,
      category: selectedColor,
      name: user.name,
    };
    onAddEvent(newEvent);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={containerStyle}>
        <div css={titleStyle}>
          <h2>스케줄 추가</h2>
        </div>
        <div css={sectionStyle}>
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDateTime(e.target.value)}
              css={dateTimeInputStyle}
            />
            <span css={separatorStyle}>-</span>
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDateTime(e.target.value)}
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
        {errorMessage && <div css={errorMessageStyle}>{errorMessage}</div>}
        <div css={buttonContainerStyle}>
          <Button onClick={handleSubmit}>작성</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarAddModal;

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
const errorMessageStyle = css`
  color: red;
  margin-top: 30px;
  font-size: 1em;
`;
