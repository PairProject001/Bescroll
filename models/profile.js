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
    getAge(){
      let yearNow = new Date().getFullYear()
      let birthDate = this.birthDate.getFullYear()
      // return `${new Date().getFullYear() - this.birthDate.getFullYear()}`
      return yearNow - birthDate
    }
    formattedDate(){
      return this.birthDate.toISOString().split('T')[0]
    }
    static associate(models) {
      // define association here
      this.hasOne(models.User)
    }
  }
  Profile.init({
    fullName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name Cannot Be Null"
        },
        notEmpty : {
          msg : "Name Cannot Be Null"
        }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Address Cannot Be Null"
        },
        notEmpty : {
          msg : "Address Cannot Be Null"
        }
      }
    },
    bio: {
      type : DataTypes.STRING,
    },
    birthDate: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Birth Date Cannot Be Null"
        },
        notEmpty : {
          msg : "Birth Date Cannot Be Null"
        },
        function (age) {
          // console.log(this.getAge(), 86)
          if (age && this.getAge() <= 10) {
            throw `Age Must Be More than 10`
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};