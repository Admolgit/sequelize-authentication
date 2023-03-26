module.exports = (Sequelize, DataTypes) => {
  return Blog = Sequelize.define('blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}