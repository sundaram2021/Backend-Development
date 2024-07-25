import { authentication, random } from '../helpers/index';
import { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById } from '../db/products.db';
import express from 'express';
import mongoose from 'mongoose';

export const gettingProducts = async(req: express.Request, res: express.Response) => {
    try {
        const products = await getAllProducts();

        if(!products){
            return res.status(400).json({ message: "No products found" });
        }

        return res.status(200).json(products).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting all products" });
    }
}

export const gettingProductByIds = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const product = await getProductById(id);

        if(!product){
            return res.status(400).json({ message: "No product found" });
        }

        return res.status(200).json(product).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting product by id" });
    }
}

export const updatingProductByDetails = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, price, description, qty } = req.body;

        if(!name || !price || !description || !qty){
            return res.status(400).json({ message: "Missing required fields, couldn't update product" });
        }

        const product = await getProductById(id);

        if(!product){
            return res.status(400).json({ message: "No product found" });
        }

        // if( user.authentication === undefined ){
        //     return res.status(400).json({ message: "No user authentication found" });
        // }

        product.name = name;
        product.price = price;
        product.description = description;
        product.qty = qty;

        const updatedProduct = await product.save();

        if(!updatedProduct){
            return res.status(400).json({ message: "No product updated" });
        }

        return res.status(200).json(updatedProduct).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while updating product by id" });
    }
}

export const deletingProductByIds = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "Missing required fields, couldn't delete product" });
        }

        const product = await deleteProductById(id);

        if(!product){
            return res.status(400).json({ message: "No product found" });
        }

        return res.status(200).json(product).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while deleting product by id" });        
    }
}

export const postProduct = async(req: express.Request, res: express.Response) => {
    try {
        const { name, price, description, qty } = req.body;

        // Log the _id to see what value is being received
        // console.log("Received _id:", _id);

        if(!name || !price || !description || !qty){
            return res.status(400).json({ message: "Missing required fields, couldn't post product" });
        }

        

        const product = await createProduct({ 
            name, 
            price, 
            description,
            qty
        });

        if(!product) {
            return res.status(400).json({ message: "Error while registering Product, couldn't register" });
        }

        return res.status(200).json({ message: "Product registered successfully", product: product });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while creating product" });
    }
}