//iniciamos express
const express = require('express');
//importamos el autenticador de usuarios
const auth = require('../middlewares/auth');
//importamos los controladores de productos
const { getProducts, createProduct, getProductById, deleteProduct, editProduct } = require('../controller/product.controller');



//iniciamos el router
const productRouter = express.Router()

//creamos las rutas para crear productos y obtener todos los productos
productRouter.route('/products')
    .post(auth, createProduct)
    .get(getProducts)

//creamos las rutas para obtener un producto por id
productRouter.route('/products/:productId')
    .get(getProductById)

//creamos las rutas para editar y eliminar un producto
productRouter.route('/admin/products/:productId')
    .put(auth, editProduct)
    .delete(auth, deleteProduct)

//exportamos el router
module.exports = productRouter;