import { css } from '@emotion/css';

export const containerStyle = css`
  font-family: "Euclid Circular A", "Poppins";
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const loadingText = css`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background-color: #ddd;
  color: #000;
  padding: 20px 30px;
  border-radius: 10px;
  opacity: 0.9;
`;