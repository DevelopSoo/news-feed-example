import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 12px;
  padding-right: 14px;
  padding-left: 14px;
  /* TODO: variant에 따라 var(--variant-color) 적용 */
  /* variant에 따라 color도 같이 변경되게 적용하기 */
  background-color: ${({ variant }) =>
    variant ? `var(--${variant}-color)` : `var(--outline-color)`};
  color: ${($color) => $color};
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
