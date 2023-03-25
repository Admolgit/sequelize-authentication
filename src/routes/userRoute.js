const express = require('express');
const authGuard  = require('../Authourization/auth');
const { createUser, login, getUsers, getUserById, deleteUser, updateUser, getUserReviews } = require('../controllers/userController');
const {RegisterValidator} = require("../validation");
const {LoginValidator} = require("../validation")

const userRouter = express.Router();

userRouter.post('/create-user', RegisterValidator, createUser);
userRouter.post('/login-user', LoginValidator, login);
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUserById);
userRouter.delete('/user/:id', deleteUser);
userRouter.put('/user/:id', updateUser);
userRouter.get('/user/review/:id', getUserReviews);

module.exports = userRouter;