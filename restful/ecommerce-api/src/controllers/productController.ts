import  express from 'express';

import { deleteProductById, getProducts, getProductById, createProduct } from '../db/product.js';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({message: 'Missing fields'});
        }

        const product = await getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({message: 'Missing fields'});
        }

        const product = await deleteProductById(id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAllProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({message: 'Missing fields'});
        }

        const product = await getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }   
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if(!id || !name || !price){
            return res.status(400).json({message: 'Missing fields'});
        }

        const product = await getProductById(id);

        product.name = name;
        product.price = price;
        await product.save();

        res.status(200).json(product).end();

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createProductByNameAndPrice = async (req: express.Request, res: express.Response) => {
    try {
        const { name, price } = req.body;

        if(!name || !price){
            return res.status(400).json({message: 'Missing fields'});
        }

        const product = await createProduct({
            name,
            price
        });

        res.status(200).json(product).end();

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}