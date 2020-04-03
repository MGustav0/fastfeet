import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 450px;
  text-align: center;
  background: #fff;
  border-radius: 5px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      text-align: start;
      font-weight: bold;
    }

    input {
      background: #fff;
      border: 2px solid;
      border-color: #dedede;
      border-radius: 5px;
      width: 300px;
      height: 45px;
      padding: 0 15px;
      color: #000;
      margin-top: 8px;
      margin-bottom: 14px;
      font-weight: 600;

      &::placeholder {
        color: #999999;
        font-weight: normal;
      }
    }

    span {
      color: #d93434;
      align-self: flex-end;
      font-weight: normal;
      font-size: 12px;
    }

    button {
      font-size: 16px;
      font-weight: bold;
      margin: 20px;
      width: 300px;
      height: 45px;
      border: 0;
      border-radius: 5px;
      color: #fff;
      background: #7d40e7;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.2, '#7d40e7')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      transition: background 0.3s;

      &:hover {
        opacity: 1;
      }
    }

    img {
      width: 75%;
      align-items: center;
      margin: 30px 0 40px;
    }
  }
`;
