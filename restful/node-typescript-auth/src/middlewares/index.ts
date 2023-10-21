import express from 'express';
import pkg from 'lodash';

const { get,  merge } = pkg;

import { getUserBySessionToken } from '../db/users.js';

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