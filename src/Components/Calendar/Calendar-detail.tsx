/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal.tsx';
import Button from '../Button.tsx';

interface CategoryColors {
  [key: string]: string;
}

const categoryColors: CategoryColors = {
  공휴일: 'var(--calendar-pink)',
  개인: 'var(--calendar-yellow)',
  업무: 'var(--calendar-peach)',
  학업: 'var(--calendar-green)',
  가족행사: 'var(--calendar-skyblue)',
  운동: 'var(--calendar-blue)',
  문화: 'var(--calendar-purple)',
  종교: 'var(--calendar-gray)',
};

interface CalendarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onSave: (updateEvent: CalendarEvent) => Promise<void>;
}
interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  category: string;
  name: string;
}
const CalendarDetailModal: React.FC<CalendarDetailModalProps> = ({ isOpen, onClose, event, onSave }) => {
  const [title, setTitle] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDateTime(formatDate(event.start));
      setEndDateTime(formatDate(event.end));
      setSelectedColor(event.category);
      setErrorMessage('');
    }
  }, [event]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
  };

  const handleSave = async (): Promise<void> => {
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
    if (event) {
      const updatedEvent: CalendarEvent = {
        ...event,
        title,
        start: new Date(startDateTime).toISOString(),
        end: new Date(endDateTime).toISOString(),
        category: selectedColor,
      };
      await onSave(updatedEvent);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={containerStyle}>
        <div css={titleStyle}>
          <h3>스케줄 상세</h3>
        </div>
        <div css={sectionStyle}>
          <label css={labelStyle} />
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder={event ? event.title : '일정 제목'}
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
          <Button onClick={handleSave}>수정</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarDetailModal;

const containerStyle = css`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const sectionStyle = css`
  margin-top: 40px;
`;

const labelStyle = css`
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-blod);
  display: block;
  margin-bottom: 10px;
`;

const inputStyle = css`
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 8px;
  font-size: var(--font-size-h2);
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
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

const dateTimeInputStyle = css`
  padding: 8px;
  font-size: var(--font-size-h6);
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
