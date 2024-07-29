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
`;

const modalContent = css`
  background: var(--background-main);
  padding: 20px;
  border-radius: var(--border-radius-medium);
  width: 1063px;
  height: 700px;
  position: relative;
`;


const closeButton = css`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 33px;
    height: 33px;
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
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div css={modalOverlay} onClick={onClose}>
      <div css={modalContent} onClick={e => e.stopPropagation()}>
        <button css={closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
            <path d="M2.68135 2.68132L30.0441 30.044M30.0441 2.68132L2.68135 30.044" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;