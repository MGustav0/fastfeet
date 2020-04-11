import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.span`
  position: relative;
  padding: 6px 6px;
  border-radius: 50%;
  margin-right: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background: #f4effc;
  color: ${darken(0.25, '#F4EFFC')};
`;
