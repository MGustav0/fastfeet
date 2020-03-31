import Sequelize from 'sequelize';

import Courier from '../app/models/Courier';
import DeliveryOrder from '../app/models/DeliveryOrder';
import DeliveryProblems from '../app/models/DeliveryProblems';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [
  Courier,
  DeliveryOrder,
  DeliveryProblems,
  File,
  Recipient,
  User,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      /** Executa somente se o "model.associate" existir */
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
