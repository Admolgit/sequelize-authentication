const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

dotenv.config()

// This is the middle ware
app.use(helmet())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Testin my api
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sequelize api'
  })
});

// Port
const PORT = process.env.PORT || 4000

// Main server
app.listen(PORT, () => console.log(`Sequelize server running on port ${PORT}`))