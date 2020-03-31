import { Op } from 'sequelize';

import Courier from '../models/Courier';
import DeliveryOrder from '../models/DeliveryOrder';

class CourierDeliveryController {
  /** Lista encomendas entregues pelo entregador. */
  async index(req, res) {
    const { id } = await req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier not exists' });
    }

    const { page = 1 } = req.query;

    const deliveries = await DeliveryOrder.findAll({
      attributes: ['id', 'product', 'end_date'],
      where: {
        courier_id: id,
        end_date: {
          [Op.lte]: new Date(),
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Courier,
          attributes: ['name', 'avatar_id', 'email'],
        },
      ],
    });

    if (!deliveries || deliveries.length === 0) {
      return res
        .status(400)
        .json({ error: 'This courier has no pending delivery' });
    }

    return res.json(deliveries);
  }
}

export default new CourierDeliveryController();
