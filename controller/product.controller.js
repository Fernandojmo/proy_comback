const Product = require('../models/Product');
const User = require('../models/User')

// Clientes

const getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        res.json({success: true, msg: "Lista de productos", info: products})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const getProductById = async(req, res) => {
    const { productId } = req.params;

    try {

        const product = await Product.findById(productId);

        res.json({success: true, msg: "Producto obtenido", info: product})

        console.log(product)
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// Admin 

const createProduct = async(req, res) => {
   
    try {
        // const user = await User.findById(req.auth.id)
        // if(!user.isAdmin){
        //     throw new Error('No tienes acceso')
        // }
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