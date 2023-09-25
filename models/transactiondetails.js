'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Transactions, { foreignKey: 'transaction_id' });
      this.belongsTo(models.Books, { foreignKey: 'book_id' });

      
  }
  }
  TransactionDetails.init({
    transaction_id: DataTypes.STRING,
    book_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionDetails',
  });
  return TransactionDetails;
};