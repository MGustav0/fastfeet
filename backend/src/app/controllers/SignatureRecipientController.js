import File from '../models/File';

class SignatureRecipientController {
  async store(req, res) {
    /** Substituindo os títulos da requisição para coincidir com os do BD */
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new SignatureRecipientController();
