const express = require('express');
const { createUser, login, getUsers, getUserById, deleteUser, updateUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/create-user', createUser);
userRouter.post('/login-user', login);
userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUserById);
userRouter.delete('/user/:id', deleteUser);
userRouter.put('/user/:id', updateUser);

module.exports = userRouter;