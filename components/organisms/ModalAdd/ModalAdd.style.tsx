import { css } from '@emotion/css';

export const modalAddStyles = css`
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

export const modalAddHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .close-btn {
    color: #fe5c89;
  }
`;

export const modalAddBody = css`
  width: 100%;
  padding: 10px 0 10px 0;
`;

export const contentAddStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const inputFormStyle = css`
  input {
    padding: 10px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
    color: #000000;
    font-size: 18px;
  }
`;

export const formGroup = css`
  text-align: left;
  margin-bottom: 10px;

  input {
    margin-top: 5px;
  }
`;

export const submitButton = css`
  display: flex;
  justify-content: space-between;
`;