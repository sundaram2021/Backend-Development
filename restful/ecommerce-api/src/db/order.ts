import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    customerEmail: { type: String, required: true },
})

export const OrderModel = mongoose.model('Order', orderSchema);

export const getOrders = () =>  OrderModel.find({}).exec();
export const getOrderById = (id: string) => OrderModel.findById(id);
export const createOrder = (order: Record<string, any>) => new OrderModel(order).save().then((order) => order.toObject());
export const deleteOrderById = (id: string) => OrderModel.findByIdAndDelete({_id: id});
export const getTotalPrice = (id: string) => OrderModel.findById(id).then((order) => order.price);
export const updateOrderByName = (name: string, update: Record<string, any>) => OrderModel.findOneAndUpdate({name: name}, update, { new: true });