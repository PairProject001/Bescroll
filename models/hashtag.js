'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Post, { through: models.PostHashtag })
    }

    static filter(query) {
      let option = {
        include: {
            model: sequelize.models.Post
        }
      }

      if (query === "2") {
          option.where = { name: '#great' }
      } else if (query === "3") {
          option.where = { name: '#good' }
      }else if (query === "1") {
          option.where = { name: '#holiday' }
      }

      return Hashtag.findAll(option)
      }
  }
  Hashtag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hashtag',
  });
  return Hashtag;
};