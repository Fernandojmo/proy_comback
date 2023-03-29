//se instancia express
const express = require('express');
//se trae el controlador con las funciones Create User, Get Users, Edit User y Delete User
const {createUser, getUsers, editUser, deleteUser}  = require('../controller/user.controller')

//se instancia el router
const userRouter = express.Router();

//se crean las rutas para cada una de las funciones del controlador
 
//se crea la ruta para crear un usuario y se le asigna la funcion createUser
userRouter.route('/user')
    //se crea la ruta para crear un usuario y se le asigna la funcion createUser 
    .post(createUser)
    //se crea la ruta para obtener todos los usuarios y se le asigna la funcion getUsers
    .get(getUsers)

//se crea la ruta para obtener un usuario en especifico y se le asigna la funcion getUser 
userRouter.route('/user/:id')
    //se crea la ruta para editar un usuario y se le asigna la funcion editUser
    .put(editUser) 
    //se crea la ruta para eliminar un usuario y se le asigna la funcion deleteUser 
    // .delete(deleteUser)

//se exporta el router
module.exports = userRouter;
