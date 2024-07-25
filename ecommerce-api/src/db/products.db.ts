import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    qty: { type: Number, required: true, default: 0 },
})


export const Product = mongoose.model("Product", productSchema);

// actions with products
export const createProduct = async(product: Record<string, any>) => new Product(product).save().then((product) => product.toObject());
export const getAllProducts = () => Product.find({}).exec();
export const getProductById = (id: string) => Product.findById({_id: id});
export const deleteProductById = (id: string) => Product.findByIdAndDelete({_id: id});
export const updateProductById = (_id: string, update: Record<string, any>) => Product.findByIdAndUpdate(_id, update, {
    new: true,
});