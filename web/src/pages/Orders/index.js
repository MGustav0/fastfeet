import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdDeleteForever,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import { FaPlus, FaEllipsisH } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Search, Status, ActionButton, ActionList } from './styles';

import InitialLetters from '~/components/InitialLetters';

export default function Orders() {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState(1);

  /** Paginação - Fazer automática */
  const [page, setPage] = useState(1);

  /** Menu view de três pontos */
  const [view, setView] = useState(1);
  const [deliveryView, setDeliveryView] = useState(1);

  /** Recupera os dados de Ordem de Delivery */
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('delivery', {
        /** Parâmetros para a pesquisa funcionar e a paginação */
        params: { search, page },
      });

      /** Mapeia os status das ordens */
      const data = response.data.map((delivery) => {
        if (delivery.end_date) {
          delivery.status = 'ENTREGUE';
        } else if (delivery.canceled_at) {
          delivery.status = 'CANCELADA';
        } else if (delivery.start_date) {
          delivery.status = 'RETIRADA';
        } else {
          delivery.status = 'PENDENTE';
        }

        return delivery;
      });

      /** Seta as variáveis com as informações */
      setDeliveries(data);
    }

    /** Carrega na página todas as informações */
    loadOrders();
  }, [search, page]);

  /** Visualiza as informações da Ordem em específico */
  function handleDeliveryView(data) {
    const { street, number, city, state, zipCode } = data.recipient;
    const { start_date, end_date, signature } = data;

    /** Formata a data de início e de fim, caso existam */
    const startDateFormatted = start_date
      ? format(parseISO(start_date), 'dd/MM/yyyy - HH:mm')
      : null;

    const endDateFormatted = end_date
      ? format(parseISO(end_date), 'dd/MM/yyyy - HH:mm')
      : null;

    /** Seta a variável com as informações */
    setDeliveryView({
      street,
      number,
      city,
      state,
      zipCode,
      startDateFormatted,
      endDateFormatted,
      signature,
    });

    setView(true);
  }

  /** Recebe o ID da ordem de entrega e carrega as informações tornando o
   * botão visível
   */
  function handleToggleActions(id) {
    const updateDelivery = deliveries.map((delivery) => {
      if (delivery.id === id) {
        delivery.visible = !delivery.visible;
      }
      return delivery;
    });

    setDeliveries(updateDelivery);
  }

  /** Redireciona para a página de edição da Ordem de Entrega */
  function handleEdit(delivery) {
    history.push({
      pathname: '/deliveries/edit',
      state: { delivery },
    });
  }

  /** Remove a Ordem de Delivery, apenas marca como removida, mas consta no
   * banco.
   * */
  async function handleRemove(id) {
    // eslint-disable-next-line no-alert
    const removeAlert = window.confirm(
      'Tem certeza que quer excluir a encomenda?'
    );

    if (!removeAlert) {
      return;
    }
    try {
      await api.delete(`/deliveries/${id}`);

      const newDeliveries = deliveries.filter((d) => d.id !== id);

      setDeliveries(newDeliveries);
    } catch (err) {
      toast.error('Falha ao excluir encomenda!');
    } finally {
      toast.success('Encomenda excluída com sucesso!');
    }
  }

  /** Fechar ActionList ao clicar em qualquer lugar da tela */

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <header>
        <Search>
          <MdSearch size={20} />
          <input
            type="search"
            placeholder="Buscar por encomendas"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
        <button type="button">
          <FaPlus size={20} />
          Cadastrar
        </button>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>#{delivery.id}</td>
              <td>{delivery.Recipient.name}</td>
              <td>
                <InitialLetters
                  className="deliveryman-name"
                  name={delivery.Courier.name}
                />
                {delivery.Courier.name}
              </td>
              <td>{delivery.Recipient.city}</td>
              <td>{delivery.Recipient.state}</td>
              <td>
                <Status status={delivery.status}>
                  <GoPrimitiveDot size={14} className="react-icons-bullet" />
                  {delivery.status}
                </Status>
              </td>

              <td>
                <ActionButton>
                  <button
                    type="button"
                    onClick={() => handleToggleActions(delivery.id)}
                  >
                    <FaEllipsisH size={24} />

                    <ActionList visible={delivery.visible}>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeliveryView(delivery);
                          handleToggleActions(delivery.id);
                        }}
                      >
                        <MdVisibility
                          size={24}
                          color="#8E5BE8"
                          style={{ marginRight: 5 }}
                        />
                        Visualizar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(delivery)}
                      >
                        <MdEdit
                          size={24}
                          color="#4D85EE"
                          style={{ marginRight: 5 }}
                        />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleRemove(delivery.id);
                        }}
                      >
                        <MdDeleteForever
                          size={24}
                          color="#DE3B3B"
                          style={{ marginRight: 5 }}
                        />
                        Excluir
                      </button>
                    </ActionList>
                  </button>
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
