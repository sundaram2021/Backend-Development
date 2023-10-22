import express from 'express';
import pkg from 'lodash';
import dotenv from 'dotenv';
dotenv.config();

const { get,  merge } = pkg;

import { getUserBySessionToken } from '../db/user.js';
import { getAllProductById, getAllProducts } from '../controllers/productController.js';
import { getProducts } from '../db/product.js';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        if(currentUserId.toString() !== id){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized to access this resource' });
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["restfulCookie"];

        if(!sessionToken){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if(!user){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized to access this resource' });
    }
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["restfulCookie"];
        const adminEmail = process.env.ADMIN_EMAIL || "";

        // console.log(sessionToken);
        

        if(!sessionToken){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if(!user || user.email !== adminEmail){
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized to access this resource' });
    }
}

export const validProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { name, price } = req.body;

        // console.log(name, price);
        

        if(!name || !price) return res.status(400).json({ error: 'Missing required fields' });

        const prod = await getProducts();
        console.log(prod);

        const valid = prod.find((product) => product.name === name);
        


        if(!valid) return res.status(404).json({ error: 'Product not found' });

        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error valid prod' });
    }
}