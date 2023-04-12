//se instancia express
const express = require('express');
//se trae el controlador con las funciones Create User, Get Users, Edit User y Delete User
const {createUser, getUsers, editUser, deleteUser, logIn, verifyUser}  = require('../controller/user.controller')
//se trae el middleware de autenticacion
const auth = require('../middlewares/auth')

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
// userRouter.route('/user/:id')
    
    //se crea la ruta para editar un usuario y se le asigna la funcion editUser
    // .put(editUser) 

    //se crea la ruta para eliminar un usuario y se le asigna la funcion deleteUser 
    // .delete(deleteUser)


//se crea la ruta para hacer login    
userRouter.route('/user/login')
    //se crea la ruta para hacer login y se le asigna la funcion singIn
    .post(logIn)

//se crea la ruta para verificar el token
userRouter.route('/user/verifyUser')
    .get(auth, verifyUser)

//se crea la ruta para editar el perfil del usuario y se le asigna la funcion editUser
userRouter.route('/user/myProfile')
    .put(auth, editUser)

//se exporta el router
module.exports = userRouter;
