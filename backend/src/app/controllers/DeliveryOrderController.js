import * as Yup from 'yup';

import DeliveryOrder from '../models/DeliveryOrder';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';

import DeliveryCreateMail from '../jobs/DeliveryCreateMail';
import Queue from '../../lib/Queue';

class DeliveryOrderController {
  async index(req, res) {
    /** "order" = Ordem de transporte */
    const packages = await DeliveryOrder.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      order: ['start_date'],
      include: [
        {
          model: Recipient,
          attributes: [
            'name',
            'street',
            'number',
            'fullAddress',
            'state',
            'city',
            'zipCode',
          ],
        },
      ],
    });

    return res.json(packages);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .positive()
        .integer()
        .required(),
      courier_id: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    const { recipient_id, courier_id } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    const courier = await Courier.findByPk(courier_id);

    const recipient = await Recipient.findByPk(recipient_id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier not exists.' });
    }

    const { product } = await DeliveryOrder.create(req.body);

    /** Envio de email */
    await Queue.add(DeliveryCreateMail.key, {
      courier,
      product,
      recipient,
    });

    return res.json({ product, recipient_id, courier_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .positive()
        .integer()
        .required(),
      courier_id: Yup.number()
        .positive()
        .integer()
        .required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    /** O "id" da ordem de transporte virá pelo parâmetro da requisição */
    const { id } = req.params;

    const { recipient_id, courier_id } = req.body;

    /** Verifica se a ordem de entrega existe */
    const orderExists = await DeliveryOrder.findByPk(id);
    if (!orderExists) {
      return res
        .status(400)
        .json({ error: "That Delivery Order doesn't exists." });
    }

    /** Verifica se Destinatário existe */
    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ message: 'Recipient not found!' });
    }

    /** Verifica se o Entregador existe */
    const courierExists = await Courier.findByPk(courier_id);

    if (!courierExists) {
      return res.status(400).json({ message: 'Courier not found!' });
    }

    /** Consulta a Ordem de Transporte no BD através da Primary Key fornecida na session. */
    const packages = await DeliveryOrder.findByPk(id);

    /** Atualiza a Ordem de Transporte */
    const {
      product,
      canceled_at,
      start_date,
      end_date,
    } = await packages.update(req.body);

    return res.json({
      product,
      recipient_id,
      courier_id,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const orderExists = await DeliveryOrder.findByPk(id);
    if (!orderExists) {
      return res
        .status(400)
        .json({ error: "That Delivery Order doesn't exists." });
    }

    await DeliveryOrder.destroy({ where: { id } });
    return res.status(200).json({ message: 'Delivery Order removed.' });
  }
}

export default new DeliveryOrderController();
