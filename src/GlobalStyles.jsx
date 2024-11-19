import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root, html, body {
    /* 주요 색깔 */
    --primary-color: #4661e6;
    --secondary-color: #6c757d;
    --text-color: #333333;
    --outline-color: #e9ecef;
    --warning-color: #ffc107;
    --background-color: #f7f8fd;
    --dark-navy: #363e68;
    --transparent-color: rgba(0, 0, 0, 0);

    /* 추가 색깔 */
    --success-color: #28a745;
    --danger-color: #dc3545;
    --info-color: #17a2b8;

    /* 기본 폰트 사이즈 */
    font-size: 14px;

		box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--background-color);
  }
`;

export default GlobalStyle;
