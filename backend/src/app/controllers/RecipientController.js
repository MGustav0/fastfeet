import * as Yup from 'yup'; /** Importa tudo de dentro do arquivo da biblioteca */
import Recipient from '../models/Recipient';

class RecipientController {
  /** Possui a mesma face de um middleware dentro do nodejs, recebe os dados de criação do
   * destinatário e cria um novo registro dentro do BD.
   */
  async store(req, res) {
    /** O Yup segue o "schema validation" */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .positive()
        .integer(),
      fullAddress: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    /** Se bater com a validação acima, retorna "true" */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const nameExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    const zipCodeExists = await Recipient.findOne({
      where: { zipCode: req.body.zipCode },
    });

    if (nameExists && zipCodeExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    /** Recebe todo o body, pois o model define o que será utilizado.
     * Mas retornará apenas o que está desestruturado nos {}
     */
    const {
      id,
      name,
      street,
      number,
      fullAddress,
      state,
      city,
      zipCode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      fullAddress,
      state,
      city,
      zipCode,
    });
  }

  /** Altera dados do Destinatário
   * O id é disponibilizado pelo SessionController.js através do Middleware: auth.js
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .positive()
        .integer(),
      fullAddress: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    /** Verificar se a validação está de acordo com as regras do "schema" */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /** Necessita passar o ID no parâmetro da URL para que o destinatário seja
     * encontrado no banco
     */
    const { id } = req.params;

    /** Consulta o Destinatário no BD através da Primary Key fornecida na session. */
    const recipient = await Recipient.findByPk(id);

    /** Atualiza o Destinatário com as informações passadas */
    const {
      name,
      street,
      number,
      fullAddress,
      state,
      city,
      zipCode,
    } = await recipient.update(req.body);

    /** Podemos passar a variável "recipient" no lugar da constante desestruturada acima
     * em conjunto com o resultado abaixo, se retirar o objeto JSON e colocar a
     * variável "(recipient)" receberemos todos os dados do banco, como o "createdAt"
     * e o "updatedAt" no corpo da requisição.
     */

    return res.json({
      id,
      name,
      street,
      number,
      fullAddress,
      state,
      city,
      zipCode,
    });
  }
}

export default new RecipientController();
