const Product = require('../models/Product');
const User = require('../models/User')

// Clientes

// controlador para obtener productos
const getProducts = async(req, res) => {
    try {
        //variable que almacena todos los productos
        const products = await Product.find()
        //respuesta del servidor con los productos
        res.json({success: true, msg: "Lista de productos", info: products})
    } catch (error) {
        //respuesta del servidor con el error
        res.status(500).json({success: false, message: error.message})
    }
}

// controlador para obtener un producto segun su id
const getProductById = async(req, res) => {
    //obtenemos el id del producto que queremos obtener
    const { productId } = req.params;
    try {
        //buscamos el producto en la base de datos
        const product = await Product.findById(productId);
        //se retorna el producto encontrado
        res.json({success: true, msg: "Producto obtenido", info: product})        
    } catch (error) {
        //respuesta del servidor con el error
        res.status(500).json({success: false, message: error.message})
    }
}

// Admin 

const createProduct = async(req, res) => {
   
    try {
        const user = await User.findById(req.auth.id)
        if(!user.isAdmin){
            throw new Error('No tienes acceso')
        }
        const productSKU = await Product.findOne({ SKU: req.body.SKU });
        if (productSKU) {
            return res.status(400).json({ success: false, message: "El SKU ya esta registrado" });
        }
        //* Guardar informacion en mi base de datos

        const newProduct =  new Product(req.body);
        await newProduct.save();


        res.status(201).json({success: true, message: "Producto Creado", info: newProduct})
            
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
} 

const editProduct = async(req, res) => {

    const {productId} = req.params;
    try {
        // const user = await User.findById(req.auth.id)
        // if(!user.isAdmin){
        //     throw new Error('No tienes acceso')
        // }
      const product = await Product.findByIdAndUpdate(productId, req.body, {new: true});

      res.json({success: true, msg: "Producto editado con exito", updateInfo: product})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteProduct = async(req, res) => {
    const {productId} = req.params;
    try {
        // const user = await User.findById(req.auth.id)
        // if(!user.isAdmin){
        //     throw new Error('No tienes acceso')
        // }
      const product = await Product.findByIdAndDelete(productId);

      res.json({success: true, msg: "Producto eliminado con exito", deleteProduct: product})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}




module.exports = {getProducts, createProduct, getProductById, deleteProduct, editProduct}