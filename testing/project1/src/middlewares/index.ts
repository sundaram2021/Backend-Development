import express from 'express';
import pkg from 'lodash';

const { get,  merge } = pkg;

import { getUserBySessionToken } from '../db/user.db';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        const { userId } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        console.log(currentUserId, userId);
        

        if(!currentUserId){
            return res.status(403).json({ error: 'Not authorized to access this resource in isOwner 1' });
        }

        if(currentUserId.toString() !== userId){
            return res.status(403).json({ error: 'Not authorized to access this resource in isOwner 2' });
        }

        return next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized to access this resource in isOwner 3' });
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["todo-node-cookie"];

        if(!sessionToken){
            return res.status(403).json({ error: 'Not authorized to access this resource in isAuthenticated 1' });
        }

        const user = await getUserBySessionToken(sessionToken);

        if(!user){
            return res.status(403).json({ error: 'Not authorized to access this resource in isAuthenticated 2' });
        }

        merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized to access this resource in isAuthenticated 3' });
    }
}