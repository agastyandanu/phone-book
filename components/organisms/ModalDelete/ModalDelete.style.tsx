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
  text-align: center;
  margin-bottom: 20px;

  p {
    margin-top: 10px;
  }
`;

export const modalDelBody = css`
  width: 100%;
  padding: 10px 0 10px 0;
`;

export const contentDelStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const submitButton = css`
  display: flex;
  justify-content: center;
  gap: 10px;
`;