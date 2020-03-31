import * as Yup from 'yup';

import Courier from '../models/Courier';
import DeliveryProblems from '../models/DeliveryProblems';
import DeliveryOrder from '../models/DeliveryOrder';
import File from '../models/File';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemsController {
  /** Lista todas as entregas com algum problema */
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryOrders = await DeliveryProblems.findAll({
      attributes: [
        'id',
        'delivery_id',
        'description',
        'created_at',
        'updated_at',
      ],
      order: ['updated_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: DeliveryOrder,
          attributes: [
            'courier_id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
        },
      ],
    });

    if (!deliveryOrders) {
      return res
        .status(400)
        .json({ error: `Congratulations! There is no order with problems!` });
    }

    return res.json(deliveryOrders);
  }

  /** Lista apenas uma entrega com algum problema */
  async list(req, res) {
    const { delivery_id } = await req.params;

    /** Verifica se a ordem de envio existe. */
    const delivery = await DeliveryOrder.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: `Delivery not found.` });
    }

    /** Localiza a ordem. */
    const deliveryProblems = await DeliveryProblems.findOne({
      where: { delivery_id },
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: DeliveryOrder,
          attributes: ['product', 'canceled_at', 'start_date', 'end_date'],
          include: [
            {
              model: Recipient,
              attributes: [
                'name',
                'street',
                'number',
                'fullAddress',
                'state',
                'state',
                'city',
                'zipCode',
              ],
            },
            {
              model: Courier,
              attributes: ['name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['name', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: `This order has no problems.` });
    }

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    const { delivery_id } = req.params;

    const deliveryOrder = await DeliveryOrder.findByPk(delivery_id);

    if (!deliveryOrder) {
      return res.status(400).json({ error: `This delivery don't exists.` });
    }

    if (deliveryOrder.canceled_at) {
      return res.status(400).json({ error: 'Delivery is canceled' });
    }

    const { description } = req.body;

    const deliveryProblem = await DeliveryProblems.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const { delivery_id, description } = await DeliveryProblems.findByPk(id);

    const delivery = await DeliveryOrder.findByPk(delivery_id, {
      include: [
        {
          model: Courier,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
        },
      ],
    });

    if (delivery.signature_id !== null) {
      return res
        .status(400)
        .json({ error: `This order has already been delivered.` });
    }

    if (delivery.canceled_at !== null) {
      return res
        .status(400)
        .json({ error: `This order has already been cancelled.` });
    }

    await delivery.update({ canceled_at: new Date() });

    /** Envio de email informando cancelamento ao courier. */
    await Queue.add(CancellationMail.key, {
      delivery,
      description,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemsController();
