import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  height: 740px;
  background: #f5f5f5;
  /* Alterar de "auto" para "740px" em caso de erro */
  min-height: auto;
  margin: 0 auto;
  padding-top: 42px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: 42px 0 28px;

    button {
      display: flex;
      justify-content: space-evenly;
      align-self: center;
      background: #7d40e7;
      color: #f2f6f7;
      border: 0;
      height: 38px;
      width: 144px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.2, '#7D40E7')};
      }
    }
  }

  table {
    border-collapse: separate !important;
    border-spacing: 0 15px !important;
    width: 100%;
    table-layout: fixed;
  }

  table td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
    height: 58px;
  }

  table th {
    padding: 0 0 0 8px;
    text-align: left;
    color: #7159c1;
  }

  /* Contorno das bordas da tabela pelo primeiro elemento */
  th:first-child,
  td:first-child {
    border-radius: 8px 0 0 8px;
    text-indent: 30%;
    width: 100px;
  }

  th:nth-child(6) {
    text-align: start;
    width: 200px;
  }

  /* Contorno das bordas da tabela pelo último elemento */
  th:last-child,
  td:last-child {
    border-radius: 0 8px 8px 0;
    text-align: center;
    width: 70px;
  }

  td {
    border-color: transparent !important;
    background: #fff;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export const Search = styled.div`
  svg {
    color: #999999;
    position: absolute;
    margin: 8px 8px;
  }

  input {
    background: #fff;
    border: 2px solid;
    border-color: #dedede;
    border-radius: 5px;
    width: 237px;
    height: 36px;
    padding-left: 30px;
    color: #000;
    font-weight: 200;

    &::placeholder {
      color: #999999;
      font-weight: normal;
    }
  }
`;

export const Status = styled.span.attrs({
  delivered: '#2CA42B',
  pending: '#C1BC35',
  canceled: '#DE3B3B',
  withdraw: '#4D85EE',
})`
  border-radius: 0.9em;
  justify-content: left;
  padding: 5px 10px;
  background: #dff0df;
  font-size: 14px;
  font-weight: bold;

  /** Cor do texto */
  color: ${(props) => {
    switch (props.status) {
      case 'ENTREGUE':
        return props.delivered;
      case 'PENDENTE':
        return props.pending;
      case 'CANCELADA':
        return props.canceled;
      default:
        return props.withdraw;
    }
  }};

  /** Cor do fundo da TAG */
  background-color: ${(props) => {
    switch (props.status) {
      case 'ENTREGUE':
        return lighten(0.5, props.delivered);
      case 'PENDENTE':
        return lighten(0.45, props.pending);
      case 'CANCELADA':
        return lighten(0.3, props.canceled);
      default:
        return lighten(0.3, props.withdraw);
    }
  }};

  .react-icons-bullet {
    vertical-align: -2px;
  }
`;

export const ActionButton = styled.div`
  button {
    border: none;
    background: none;
    color: #999999;
  }
`;

/* Menu de Ações */
export const ActionList = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  background: #fff;
  height: 110px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ddd;
  /** Centraliza o menu dentro do elemento pai <ActionButton> */
  transform: translate(-40%, 0%);

  /* Triangulo do menu */
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 11px solid #ddd;
    position: absolute;
    top: -11px;
    left: 50%;
    margin-left: -10px;
  }

  button {
    display: flex;
    height: 120px;
    width: 110px;
    text-align: center;
    background: #fff;
    border-bottom: 0.5px solid #ddd;
    color: #999999;
    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const View = styled.div`
  display: ${(props) => (props.view ? 'flex' : 'none')};
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 5;
  top: 200px;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #ddd;
  button {
    border: none;
    background: none;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    margin-bottom: 15px;
    svg {
      margin-left: 150px;
    }
  }
  .street,
  .city,
  .zipCode {
    font-size: 16px;
    color: #666;
    padding-bottom: 10px;
  }
  .dates {
    margin: 5px 0;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }
  .withdraw,
  .delivery {
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  .zipCode,
  .delivery {
    padding-bottom: 5px;
    border-bottom: 1px solid #eeeeee;
  }
  .signature {
    margin: 5px 0;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }
  img {
    width: 240px;
    height: 150px;
    margin: 5px 70px;
  }
`;
