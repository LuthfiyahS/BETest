'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Members, { foreignKey: 'member_id' });
      this.hasMany(models.TransactionDetails, { foreignKey: 'transaction_id' });

    }
  }
  Transactions.init({
    member_id: DataTypes.STRING,
    borrow_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};