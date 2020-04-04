import React from 'react';
import api from '~/services/api';

import { Container } from './styles';

export default function Orders() {
  api.get('delivery');
  return (
    <Container>
      <h1>Encomendas</h1>
    </Container>
  );
}
