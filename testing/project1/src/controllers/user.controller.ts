import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/user.db';

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        const user = await deleteUserById(id);

        if(!user){
            return res.status(404).json({ error: 'user not found' });
        }

        return res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while deleting the user' });
    }
}

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while getting the users' });
    }
}

export const getSingleUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        const user = await getUserById(id);

        if(!user){
            return res.status(404).json({ error: 'user not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while getting the user' });
    }
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { username, email } = req.body;

        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        if(!username && !email){
            return res.status(400).json({ error: 'username or email is required' });
        }

        const user = await updateUserById(id, { username, email });

        if(!user){
            return res.status(404).json({ error: 'user not found' });
        }

        return res.status(200).json({ user });
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: 'error while updating the user' });
    }
}