const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({
    sku: {type: String, required: true},
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true}
})
const Product = mongoose.model('product', productSchema);
module.exports = Product;