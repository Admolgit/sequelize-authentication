module.exports = (sequelize, DataTypes) => {
  return Review = sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    published: {
      type: DataTypes.BOOLEAN
    }
  })
}