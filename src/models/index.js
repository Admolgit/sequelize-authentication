const configDb = require("../sequelize.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(configDb.DB, configDb.USER, configDb.PASSWORD, {
  host: configDb.HOST,
  dialect: configDb.dialect,
  operatorsAliases: false,

  pool: {
    max: configDb.pool.max,
    min: configDb.pool.min,
    acquire: configDb.pool.acquire,
    idle: configDb.pool.idle,
  },
});

// Authentication
sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected..."))
  .catch((err) => console.log(err.message));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// For ORM
db.products = require("./productModels")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);
db.blogs = require("./blogModel")(sequelize, DataTypes);

// Data lose prevention when app runs
db.sequelize.sync({
  force: false,
}).then(() => console.log('Yes re-sync done!'));

// 1 to many relationship
db.users.hasMany(db.products, {
  foreignKey: 'id',
  as: 'product'
})
db.users.hasMany(db.reviews, {
  foreignKey: 'id',
  as: 'review'
})

db.products.hasMany(db.reviews, {
  foreignKey: 'id',
  as: 'review'
});
// Where it belongs to (Productd)
db.reviews.belongsTo(db.products, {
  foreignKey: 'id',
  as: 'product'
})

db.products.belongsTo(db.users, {
  foreignKey: 'id',
  as: 'user'
})

db.reviews.belongsTo(db.users, {
  foreignKey: 'id',
  as: 'user'
})

module.exports = db;