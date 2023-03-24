const express = require('express');
const {createUser, getUsers, editUser, deleteUser}  = require('../controllers/user.controller')

const userRouter = express.Router();

userRouter.route('/user')
    .post(createUser)
    .get(getUsers)

userRouter.route('/user/:id')
    .put(editUser)  
    .delete(deleteUser)

module.exports = userRouter;
