import { getUserBySessionToken } from '../db/users.db';
import express from 'express';
import pkg from 'lodash';

const { get,  merge } = pkg;

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