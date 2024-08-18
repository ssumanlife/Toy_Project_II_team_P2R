/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const sectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  background: var(--background-main);
`;

const iframeStyle = css`
  width: 300px;
  height: 300px;
  border: none;
`;

const LoadingAnimation = () => (
  <section css={sectionStyle}>
    <iframe
      src="https://lottie.host/embed/3c256121-3da0-4a84-a0ae-fadef9fc5ec3/OoBZY9VBra.json"
      css={iframeStyle}
      title="Loading Animation"
    />
  </section>
);

export default LoadingAnimation;
