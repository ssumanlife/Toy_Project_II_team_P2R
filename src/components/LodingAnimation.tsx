/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const sectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  background: var(--background-main);
`;

const loaderStyle = css`
  position: relative;
  width: 50px;
  height: 50px;
  filter: url(#gooey);
  animation: rotate 4s linear infinite;
  animation-delay: calc(-0.3s * var(--i));
`;

const spanStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  transform: rotate(calc(45deg * var(--i)));

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background: linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) 50%, var(--primary-blue) 100%);
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
`;

const rotate = css`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingAnimation = () => (
  <section css={sectionStyle}>
    <svg css={{ width: '0', height: '0' }}>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" /> {/* stdDeviation 값을 더 줄임 */}
        <feColorMatrix
          values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
        />
      </filter>
    </svg>

    <div css={loaderStyle}>
      {[...Array(8)].map((_, i) => (
        <span css={[spanStyle, rotate]} style={{ '--i': i + 1 }} key={i} />
      ))}
      {[...Array(5)].map((_, j) => (
        <span css={[spanStyle, rotate]} style={{ '--i': j + 8 }} key={j + 8} />
      ))}
    </div>
  </section>
);

export default LoadingAnimation;
