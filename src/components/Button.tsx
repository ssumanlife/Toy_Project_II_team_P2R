/* eslint-disable react/no-unknown-property */
/* eslint-disable react/require-default-props */
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
  color: var(--whitefff, #fff);

  &:hover {
    background-color: #2a63d1;
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
  customBorderRadius?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  customWidth,
  customFontSize,
  customBorderRadius,
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
        ${customBorderRadius && `border-radius: ${customBorderRadius};`}
      `;
  }

  return (
    <button css={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
