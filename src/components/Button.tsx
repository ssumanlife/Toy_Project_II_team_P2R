/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const baseButtonStyles = css`
  width: 150px;
  height: 50px;
  border-radius: var(--border-radius-large);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-h4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const primaryButtonStyles = css`
  ${baseButtonStyles};
  border: none;
  background-color: var(--primary-blue);
  color: var(--text-white);

  &:hover {
    background-color: #2A63D1;
  }
`;

const secondaryButtonStyles = css`
  ${baseButtonStyles};
  border: 1px solid var(--text-white-gray);
  color: var(--primary-blue);
  background-color: var(--background-main);

  &:hover {
    border: 1px solid var(--primary-blue);
  }
`;

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  customWidth?: string;
  customFontSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  customWidth,
  customFontSize
 }) => {
  let buttonStyle;

  switch (variant) {
    case 'secondary':
      buttonStyle = secondaryButtonStyles;
      break;
    case 'primary':
    default:
      buttonStyle = css`
        ${primaryButtonStyles};
        ${customWidth && `width: ${customWidth};`}
        ${customFontSize && `font-size: ${customFontSize};`}
      `;
  }

  return (
    <button css={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;