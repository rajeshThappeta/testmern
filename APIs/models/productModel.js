const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
 
});

//create model
const Product = mongoose.model("product", productSchema);

//export model
module.exports = Product;