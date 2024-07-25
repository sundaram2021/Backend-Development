import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true } // Optional: to keep a record of the price at the time of order
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Example statuses
        required: true
    },
    date: { type: Date, default: Date.now, required: false }, // Optional: to keep a record of the order date
    deliveryTime: { type: Number, required: true } // Optional: to keep a record of the delivery time
});

export const Order = mongoose.model("Order", orderSchema);


// actions with orders
export const createOrder = async(order: Record<string, any>) => new Order(order).save().then((order) => order.toObject());
export const getAllOrders = () => Order.find({}).exec();
export const getOrderById = (id: string) => Order.findById({_id: id});
export const deleteOrderById = (id: string) => Order.findByIdAndDelete({_id: id});
export const getOrdersByUserId = (id: string) => Order.find({ user: id }).exec();
