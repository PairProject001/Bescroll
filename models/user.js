'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Profile)
      this.hasMany(models.Post)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Username Cannot Be Null"
        },
        notEmpty : {
          msg : "Username Cannot Be Null"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password Cannot Be Null"
        },
        notEmpty : {
          msg : "Password Cannot Be Null"
        }
      }
    },
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
    user.role = 'User'
  });

  return User;
};