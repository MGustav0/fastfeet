import * as Yup from 'yup';
import { Op } from 'sequelize';

import Courier from '../models/Courier';

class CourierController {
  /** Recupera todos os Entregadores, somente usuários logados. */
  async index(req, res) {
    const { page = 1 } = req.query;

    const searchCourier = req.query.q
      ? {
          name: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        }
      : {};

    const couriers = await Courier.findAll({
      where: searchCourier,
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number()
        .positive()
        .integer(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists.' });
    }

    const { id, name, avatar_id, email } = await Courier.create(req.body);

    return res.json({ id, name, avatar_id, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number()
        .positive()
        .integer(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitadion fails.' });
    }

    const { email } = req.body;

    const courier = await Courier.findByPk(req.params.id);

    if (email && email !== courier.email) {
      const courierExists = await Courier.findOne({ where: { email } });

      if (courierExists) {
        return res.status(400).json({ error: 'Courier already exists.' });
      }
    }

    const { id, name, avatar_id } = await courier.update(req.body);

    return res.json({ id, name, avatar_id, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    const courierExists = await Courier.findByPk(id);
    if (!courierExists) {
      return res.status(400).json({ error: "That courier doesn't exists." });
    }

    await Courier.destroy({ where: { id } });
    return res.status(200).json({ message: 'Courier removed.' });
  }
}

export default new CourierController();
