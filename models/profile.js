'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User)
    }
  }
  Profile.init({
    fullName: {
      type  : DataTypes.STRING,
      unique : true
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    bio: DataTypes.STRING,
    birthDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};