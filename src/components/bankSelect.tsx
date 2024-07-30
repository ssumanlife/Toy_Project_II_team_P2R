/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { valueStyles } from '../Pages/EmployeeList/EmployeeSpecificModal' 

const selectStyles = css`
  ${valueStyles}
  border: none;
  border-bottom: 2px solid #d9d9d9;
  background-color: white;
  width: 100px;
  
  &:focus {
    border-color: var(--primary-blue); /* 포커스된 상태에서의 테두리 색상 */
    outline: none; /* 기본 포커스 아웃라인 제거 */
  }
`;

const optionStyles = css`
  background-color: var(--background-white);
`;

const SelectComponent: React.FC = () => {
  return (
    <div>
      <select id="selectInput" css={selectStyles} defaultValue="option0">
        <option css={optionStyles} value="option0" disabled hidden>선택</option>
        <option css={optionStyles} value="option1">국민</option>
        <option css={optionStyles} value="option2">농협</option>
        <option css={optionStyles} value="option3">하나</option>
      </select>
    </div>
  );
};

export default SelectComponent;
