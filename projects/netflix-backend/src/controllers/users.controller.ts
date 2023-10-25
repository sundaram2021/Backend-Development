import { authentication, random } from '../helpers/index';
import { createUser, deleteUserById, getAllUsers, getUserByEmail, getUserById } from '../db/users.db';
import express from 'express';

export const gettingUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getAllUsers();

        if(!users){
            return res.status(400).json({ message: "No users found" });
        }

        return res.status(200).json(users).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting all users" });
    }
}

export const gettingUserById = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);

        if(!user){
            return res.status(400).json({ message: "No user found" });
        }

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting user by id" });
    }
}

export const updatingUserByDetails = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "Missing required fields, couldn't update" });
        }

        const user = await getUserById(id);

        if(!user){
            return res.status(400).json({ message: "No user found" });
        }

        user.username = username;
        user.email = email;
        user.authentication.password = password;

        const updatedUser = await user.save();

        if(!updatedUser){
            return res.status(400).json({ message: "No user updated" });
        }

        return res.status(200).json(updatedUser).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while updating user by id" });
    }
}

export const deletingUserById = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "Missing required fields, couldn't delete" });
        }

        const user = await deleteUserById(id);

        if(!user){
            return res.status(400).json({ message: "No user found" });
        }

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while deleting user by id" });        
    }
}

export const postUser = async(req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "Missing required fields, couldn't post user" });
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({ message: "User already exists, couldn't post user" });
        }

        const salt = random();

        const user = await createUser({ 
            username, 
            email, 
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        if(!user) {
            return res.status(400).json({ message: "Error while registering user, couldn't register" });
        }

        return res.status(200).json({ message: "User registered successfully", user: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while creating user" });
    }
}