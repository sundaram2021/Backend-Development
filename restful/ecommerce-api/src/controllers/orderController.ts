import express from 'express';
import { createOrder, deleteOrderById, getOrderById, getOrders } from '../db/order.js';



export const getAllOrders = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await getOrders();

        if(!orders) return res.status(404).json({ error: 'Orders not found' });

        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const getOrderByUniqueId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const order = await getOrderById(id);

        if(!order) return res.status(404).json({ error: 'Order not found' });

        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const postOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { name, price, customerEmail } = req.body;

        if(!name || !price) return res.status(400).json({ error: 'Missing required fields' });

        const order = await createOrder({ name, price, customerEmail });

        return res.status(201).json(order);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error post order' });
    }
}

export const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const order = await getOrderById(id);

        if(!order) return res.status(404).json({ error: 'Order not found' });

        await deleteOrderById(id);

        return res.status(204).send();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const patchOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const order = await getOrderById(id);

        if(!order) return res.status(404).json({ error: 'Order not found' });

        const { name, price } = req.body;

        if(!name && !price) return res.status(400).json({ error: 'Missing required fields' });

        order.name = name;
        order.price = price;

        await order.save();

        return res.status(200).json(order);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}