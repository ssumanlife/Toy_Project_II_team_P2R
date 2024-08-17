/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Button from '../Button.tsx';

interface CalendarDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  eventId: string;
}

const CalendarDeleteModal: React.FC<CalendarDeleteModalProps> = ({ isOpen, onClose, onDelete, eventId }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    await onDelete();
    onClose();
  };

  return (
    <div
      css={modalOverlay}
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
    >
      <div
        css={modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
      >
        <div css={modalContentStyle}>
          <div css={messageStyle}>삭제하시겠습니까?</div>
          <div css={buttonContainerStyle}>
            <Button onClick={handleDelete} variant="primary">
              예
            </Button>
            <Button onClick={onClose} variant="secondary">
              아니오
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDeleteModal;

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(69, 69, 69, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContent = css`
  width: 350px;
  height: 210px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px 20px 10px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  z-index: 1001;
`;

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const messageStyle = css`
  font-size: 24px;
  margin-bottom: 60px;
  text-align: center;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 20px;
`;
