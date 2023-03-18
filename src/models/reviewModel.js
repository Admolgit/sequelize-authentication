module.exports = (sequelize, DataTypes) => {
  return Review = sequelize.define('review', {
    rating: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })
}