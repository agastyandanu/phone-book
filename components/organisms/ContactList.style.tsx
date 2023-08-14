import { css } from '@emotion/css';

export const ContactListStyles = css`
  align-items: center;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
`;

export const TableStyles = css`
  width: 100%;
  border-collapse: collapse;
  color: #000;
  cursor: pointer;

  .favourite-contacts {
    margin-bottom: 10px;
  }

  .regular-contacts {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  td {
    padding: 10px 8px 2px 8px;
    text-align: left;
  }

  tr:hover {
    background-color: #F5F5F5;
    transition: background-color 0.2s ease;
  }

  .profilePhoto {
    width: 50px;
    
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  @media (max-width: 576px) {
    td:nth-last-child(3) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    td:nth-last-child(1) {
      display: none;
    }
  }

  @media (max-width: 992px) {
    td:nth-last-child(2) {
      display: none;
    }
  }
`;

export const ActionButtonStyles = css`
  display: flex;
  gap: 5px;
  justify-content: center;

  .is-fav {
    font-size: 20px;
  }

  .not-fav {
    font-size: 20px;
  }
`
