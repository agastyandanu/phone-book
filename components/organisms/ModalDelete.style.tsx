import { css } from '@emotion/css';

export const modalDelStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalDelHeader = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const contentDelStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
