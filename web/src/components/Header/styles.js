import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  max-width: 1440px;
  margin: 0 auto;
  border: 1px solid #eee;
`;

export const Content = styled.div`
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      width: 180px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      margin-left: 20px;
      font-weight: bold;
      color: #000;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  div {
    text-align: right;

    strong {
      display: block;
      color: #333;
      font-size: 13px;
      margin-bottom: 5px;
      margin-top: -15px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 13px;
      color: red;
    }
  }
`;
