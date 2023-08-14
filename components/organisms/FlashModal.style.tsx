import { css } from '@emotion/css';

export const modalStyles = css`
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

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .close-btn {
    color: #fe5c89;
  }
`;

export const modalBody = css`
  width: 100%;
  padding: 10px 0 10px 0;
`;

export const contentStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;