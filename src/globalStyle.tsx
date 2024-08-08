/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, css } from '@emotion/react';

const baseStyle = css`
  /* reset.css */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :root {
    /* Primary Colors */
    --primary-blue: #578aea;
    --light-blue: #f4f8ff;

    /* Text Colors */
    --text-gray: #585858;
    --text-light-gray: #a0a0a0;
    --text-white-gray: #dddddd;
    --text-blue: #578aea;
    --text-white: #ffffff;

    /* Background Colors */
    --background-main: #ffffff;
    --background-sub: #fafafa;
    --background-gradient-start: #90b6ff;
    --background-gradient-end: #e8edff;

    /* Calendar Colors */
    --calendar-pink: #ffc6c6;
    --calendar-yellow: #ffd596;
    --calendar-peach: #ffed8e;
    --calendar-green: #cce2c9;
    --calendar-skyblue: #a8d6f8;
    --calendar-blue: #748aff;
    --calendar-purple: #cea7ff;
    --calendar-gray: #8da1c6;

    /* Font Family */
    --font-family: 'Noto Sans KR', sans-serif;

    /* Font Weights */
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;

    /* Font Sizes */
    --font-size-base: 1rem; /* 기본 폰트 사이즈 (16px) */
    --font-size-h1: 2rem; /* 32px */
    --font-size-h2: 1.5rem; /* 24px */
    --font-size-h3: 1.375rem; /* 22px */
    --font-size-h4: 1.25rem; /* 20px */
    --font-size-h5: 1.125rem; /* 18px */
    --font-size-h6: 1rem; /* 16px */

    /* Shadows */
    --shadow-default: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);

    /* Borders */
    --border-default: 1px solid;
    --border-radius-small: 10px;
    --border-radius-medium: 20px;
    --border-radius-large: 22px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    font-family: var(--font-family);
    background-color: var(--background-main);
    color: var(--text-gray);
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    margin: 0 auto;
  }

  button {
    cursor: pointer;
    border: none;
  }

  a {
    text-decoration: none;
    color: var(--text-gray);
  }

  a:hover {
    color: var(--text-blue);
  }

  /* Heading Styles */
  h1 {
    font-size: var(--font-size-h1);
    font-weight: var(--font-weight-bold);
    color: var(--text-blue);
  }

  h2 {
    font-size: var(--font-size-h2);
    font-weight: var(--font-weight-bold);
    color: var(--text-gray);
  }

  h3 {
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-medium);
    color: var(--text-gray);
  }

  h4 {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-regular);
    color: var(--text-gray);
  }

  h5 {
    font-size: var(--font-size-h5);
    font-weight: var(--font-weight-regular);
    color: var(--text-gray);
  }
`;

const GlobalStyle: React.FC = () => <Global styles={baseStyle} />;

export default GlobalStyle;
