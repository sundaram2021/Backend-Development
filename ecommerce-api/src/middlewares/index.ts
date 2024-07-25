import { getUserBySessionToken } from '../db/users.db';
import express from 'express';
import pkg from 'lodash';
import { Product } from '../db/products.db';

const { get,  merge } = pkg;


export const isAdminOrOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;

        const currentUserId = get(req, 'identity._id') as unknown as string;

        if(!currentUserId){
            return res.status(403).json({ error: 'Couldn"t get currentUserId' });
        }

        if(currentUserId.toString() !== id){
            return isAdmin(req, res, next);
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'You are not the owner of this resource' });
    }
}

// export const isProdudctAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

// }

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = get(req, 'identity') as unknown as any;

        // const { email } = req.params

        if(!user ){
            // console.log('fjkjks');
            
            return res.status(403).json({ error: 'Error while getting user admin acess' });
        }

        if(user.email !== process.env.ADMIN_EMAIL!){
            return res.status(403).json({ error: 'You are not an admin to perform this operation' });
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'You are not an admin to perform this operation' });
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;

        const currentUserId = get(req, 'identity._id') as unknown as string;

        if(!currentUserId){
            return res.status(403).json({ error: 'Couldn"t get currentUserId' });
        }

        if(currentUserId.toString() !== id){
            return res.status(403).json({ error: 'You don"t have the right permissions' });
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'You are not the owner of this resource' });
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["netflix-backend-cookie"];

        if(!sessionToken){
            return res.status(403).json({ error: 'Error while getting session token' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if(!user){
            return res.status(403).json({ error: 'You are not authenticated to perform this operation' });
        }

        merge(req, { identity: user });

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'You are not authenticated to perform this operation' });
    }
}


export const updateDiffProductQty = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { products } = req.body;

        if(!products){
            return res.status(400).json({ error: 'No products found' });
        }

        await Promise.all(products.map(async (product: { productId: any, quantity: number }) => {
            const productDoc = await Product.findById(product.productId);
            if (productDoc) {
                productDoc.qty -= product.quantity; // Update the quantity
                await productDoc.save();
            }
        }));

        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating product quantity' });
    }
}


export const updateAddProductQty = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { products } = req.body;

        if(!products){
            return res.status(400).json({ error: 'No products found' });
        }

        await Promise.all(products.map(async (product: { productId: any, quantity: number }) => {
            const productDoc = await Product.findById(product.productId);
            if (productDoc) {
                productDoc.qty += product.quantity; // Update the quantity
                // productDoc.status = "Cancelled"
                await productDoc.save();
            }
        }));

        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating product quantity' });
    }
}