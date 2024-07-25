import { authentication, random } from '../helpers/index';
import { createOrder, getAllOrders, getOrderById, deleteOrderById, getOrdersByUserId } from '../db/orders.db';
import express from 'express';
import { Product } from '../db/products.db';
import { Order } from '../db/orders.db';

export const gettingOrders = async(req: express.Request, res: express.Response) => {
    try {
        const orders = await getAllOrders();

        if(!orders){
            return res.status(400).json({ message: "No orders found" });
        }

        return res.status(200).json(orders).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting all orders" });
    }
}

export const gettingOrderByIds = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const order = await getOrderById(id);

        if(!order){
            return res.status(400).json({ message: "No order found" });
        }

        return res.status(200).json(order).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting order by id" });
    }
}



export const deletingOrderById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing required fields, couldn't delete" });
        }

        // Find the order by ID
        const order = await Order.findById(id);
        if (!order) {
            return res.status(400).json({ message: "No order found" });
        }

        // Delete the order from the database
        await order.deleteOne();

        return res.status(200).json({ message: "Order deleted successfully", order }).end();

    } catch (error) {
        console.error('Error while deleting order:', error);
        return res.status(500).json({ message: "Error while deleting order by id" });        
    }
};


export const postOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { date, products, user, status, deliveryTime } = req.body;

        console.log('req.body:', req.body);
        console.log('date:', date);
        console.log('products:', products);
        // console.log('total:', total);
        console.log('user:', user);
        console.log('status:', status);
        console.log('deleveryTime:', deliveryTime);

        if (!products || !user || !status || !deliveryTime) {
            console.log('Missing required fields, couldn\'t post order');
            return res.status(400).json({ message: "Missing required fields, couldn't post order" });
        }

        const orderData = {
            products,
            user,
            status: "Shipped"  || status,
            date: date || new Date(),
            deliveryTime: deliveryTime || 1,
        };

        const deliveryDate = calculateDeliveryDate(orderData.date, orderData.deliveryTime);

        const order = await createOrder(orderData);

        if (!order) {
            return res.status(400).json({ message: "Error while registering Order, couldn't register" });
        }

        return res.status(200).json({ message: "Order registered successfully", order, deliveryDate }).end();

    } catch (error) {
        console.error('Error while creating order:', error);
        return res.status(500).json({ message: "Error while creating Order" });
    }
};



// Function to calculate delivery date
function calculateDeliveryDate(date: Date, daysToAdd: number): Date {
    const result = new Date(date || Date.now()); // Use current date if none provided
    result.setDate(result.getDate() + daysToAdd); // Add days
    return result;
}