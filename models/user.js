'use strict';
var bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profile, {foreignKey : 'ProfileId'})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);

    user.password = hash
  });
  User.beforeCreate(async (user, options) => {
    user.role = `User`
  });

  return User;
};