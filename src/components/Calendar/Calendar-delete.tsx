/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Modal from '../Modal';

interface CalendarDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const messageStyle = css`
  font-size: 24px;
  padding-top: 20px;
  width: 300px;
  margin-bottom: 20px;
  text-align: center;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 20px;
`;

const buttonStyle = css`
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const confirmButtonStyle = css`
  ${buttonStyle}
  background-color: var(--primary-blue);
  color: white;
`;

const cancelButtonStyle = css`
  ${buttonStyle}
  background-color: var(--background-sub);
  color: var(--text-gray);
`;

const CalendarDeleteModal: React.FC<CalendarDeleteModalProps> = ({ isOpen, onClose, onConfirm, eventTitle }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={modalContentStyle}>
        <div css={messageStyle}>삭제하시겠습니까?</div>
        <div css={buttonContainerStyle}>
          <button css={confirmButtonStyle} onClick={onConfirm}>
            예
          </button>
          <button css={cancelButtonStyle} onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarDeleteModal;
