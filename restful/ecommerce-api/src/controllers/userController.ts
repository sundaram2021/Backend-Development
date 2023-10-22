import express from 'express';

import { deleteUserBYId, getUSers, getUserById } from '../db/user.js';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUSers();

        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => { 
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserBYId(id);

        return res.status(200).json({ deletedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if(!username){
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json({ user }).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}