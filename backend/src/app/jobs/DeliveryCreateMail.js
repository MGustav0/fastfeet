import Mail from '../../lib/Mail';

class DeliveryCreateMail {
  get key() {
    return 'DeliveryCreateMail';
  }

  async handle({ data }) {
    const { courier, product, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: `Ordem de Entrega Criada`,
      template: 'deliveryCreateOrder',
      context: {
        courier: courier.name,
        product,
        name: recipient.name,
        street: recipient.street,
        number: recipient.number,
        fullAddress: recipient.fullAddress,
        state: recipient.state,
        city: recipient.city,
        zipCode: recipient.zipCode,
      },
    });
  }
}

export default new DeliveryCreateMail();
