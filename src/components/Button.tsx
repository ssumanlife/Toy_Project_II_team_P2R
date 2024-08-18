/* eslint-disable react/no-unknown-property */
/* eslint-disable react/require-default-props */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const baseButtonStyles = css`
  width: 110px;
  height: 40px;
  border-radius: var(--border-radius-large);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-h5);
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
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  customWidth?: string;
  customHeight?: string;
  customFontSize?: string;
  customBorderRadius?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  customWidth,
  customFontSize,
  customBorderRadius,
  customHeight,
}) => {
  let buttonStyle;

  switch (variant) {
    case 'secondary':
      buttonStyle = css`
        ${secondaryButtonStyles};
        ${customWidth && `width: ${customWidth};`}
        ${customFontSize && `font-size: ${customFontSize};`}
        ${customBorderRadius && `border-radius: ${customBorderRadius};`}
      `;
      break;
    case 'primary':
    default:
      buttonStyle = css`
        ${primaryButtonStyles};
        ${customWidth && `width: ${customWidth};`}
        ${customFontSize && `font-size: ${customFontSize};`}
        ${customBorderRadius && `border-radius: ${customBorderRadius};`}
        ${customHeight && `height: ${customHeight};`}
      `;
  }

  return (
    <button type={type} css={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
