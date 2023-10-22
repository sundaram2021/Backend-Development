import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
})

export const ProductModel = mongoose.model('Product', productSchema);

export const getProducts = () =>  ProductModel.find({}).exec();
export const getProductById = (id: string) => ProductModel.findById(id);
export const createProduct = (product: Record<string, any>) => new ProductModel(product).save().then((product) => product.toObject());
export const deleteProductById = (id: string) => ProductModel.findByIdAndDelete({_id: id});
export const updateProductById = (id: string, update: Record<string, any>) => ProductModel.findByIdAndUpdate(id, update, { new: true });