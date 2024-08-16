/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(69, 69, 69, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContent = css`
  background: var(--background-main);
  padding: 20px 10px;
  border-radius: var(--border-radius-medium);
  // width: 1063px;
  // height: 700px;
  position: relative;
  z-index: 1001;
`;

const closeButton = css`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    stroke: var(--text-light-gray);
  }

  &:hover svg {
    stroke: var(--primary-blue); /* 호버 시 색상 변경 */
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  return (
    <div css={modalOverlay} onClick={onClose}>
      <div css={modalContent} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button css={closeButton} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
              <path
                d="M2.68135 2.68132L30.0441 30.044M30.0441 2.68132L2.68135 30.044"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
