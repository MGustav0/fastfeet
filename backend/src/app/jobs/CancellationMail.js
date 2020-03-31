import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, description } = data;

    await Mail.sendMail({
      to: `${delivery.Courier.name} <${delivery.Courier.email}>`,
      subject: `Ordem de Entrega Cancelada`,
      template: 'deliveryCancelOrder',
      context: {
        Courier: delivery.Courier.name,
        description,
        product: delivery.product,
        name: delivery.Recipient.name,
        street: delivery.Recipient.street,
        number: delivery.Recipient.number,
        fullAddress: delivery.Recipient.fullAddress,
        state: delivery.Recipient.state,
        city: delivery.Recipient.city,
        zipCode: delivery.Recipient.zipCode,
      },
    });
  }
}

export default new CancellationMail();
