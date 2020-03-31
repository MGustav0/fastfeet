import * as Yup from 'yup';

import Courier from '../models/Courier';
import DeliveryOrder from '../models/DeliveryOrder';
import File from '../models/File';

class CourierFinishController {
  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      signature_id: Yup.string().required(),
      end_date: Yup.date().required(),
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

    const { product, end_date, signature_id } = await req.body;

    /** Recupera a encomenda, com base no seu ID. */
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

    /** Não permitir data inferior à data e hora de início da entrega. */
    if (new Date(end_date) < delivery.start_date) {
      return res
        .status(400)
        .json({ error: `Deliveries can not be finalized with past dates.` });
    }

    /** Adiciona a imagem de assinatura do cliente */
    const signatureImage = await File.findByPk(signature_id);

    if (!signatureImage) {
      return res
        .status(400)
        .json({ error: `Signature image does not exists.` });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }
}

export default new CourierFinishController();
