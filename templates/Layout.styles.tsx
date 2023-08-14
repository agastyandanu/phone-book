import { css } from '@emotion/css';

export const layoutStyles = css`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: linear-gradient(-140deg, #ff65c5, #fa909d, #fcce6c);
  font-family: "Euclid Circular A", "Poppins";
  padding: 70px 50px;
  color: #000000;

  @media (width <= 768px) {
    padding: 70px 15px 15px 15px;
  }
`;

export const contentStyles = css`
  display: flex;
  align-items: center;
  width: 80vw;
  padding: 30px 20px 50px 20px;
  background: #ffffff;
  border-radius: 24px;

  @media (width <= 768px) {
    padding: 150px 10px 10px 20px;
    width: 100%;
    text-align: center;
    flex-direction: column;
  }
`;