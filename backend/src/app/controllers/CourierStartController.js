import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, formatISO } from 'date-fns';

import DeliveryOrder from '../models/DeliveryOrder';
import Courier from '../models/Courier';

class CourierStartController {
  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    const { id } = await req.params;

    /** Verifica se o courier existe */
    const courier = await Courier.findByPk(id);
    if (!courier) {
      return res.status(400).json({ error: `Courier don't exists.` });
    }

    const { product, start_date } = await req.body;

    /** Localiza a encomenda. */
    const delivery = await DeliveryOrder.findOne({
      where: {
        product,
      },
      attributes: ['id', 'product', 'start_date'],
    });

    /** Verifica se produto existe */
    if (!delivery) {
      return res.status(400).json({ error: `This product don't exists.` });
    }

    /** Não permitir data diferente da atual */
    const startDay = startOfDay(new Date());
    const endDay = endOfDay(new Date());

    if (new Date(start_date) < startDay || new Date(start_date) > endDay) {
      res.status(400).json({ error: `Invalid delivery withdrawal date.` });
    }

    /** Localiza todas as encomendas, com base no ID do courier. */
    const deliveries = await DeliveryOrder.findAll({
      where: {
        courier_id: id,
        start_date: {
          [Op.gte]: formatISO(
            startOfDay(new Date(), { representation: 'date' })
          ),
        },
      },
      attributes: ['id', 'product', 'start_date'],
      include: [
        {
          model: Courier,
          attributes: ['name', 'avatar_id', 'email'],
        },
      ],
    });

    /** Limita a quantidade de entregas. */
    if (deliveries.length > 4) {
      return res
        .status(400)
        .json({ error: `This courier has already made 5 deliveries.` });
    }

    /** Adiciona a imagem de assinatura do cliente */

    await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new CourierStartController();
