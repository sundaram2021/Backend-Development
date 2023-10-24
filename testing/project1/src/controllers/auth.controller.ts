import express from 'express';
import { createUser, getUserByEmail } from '../db/user.db';
import { authentication, random } from '../helpers/index';

export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;   

        if(!email || !password){
            return res.status(400).send({ message: "Missing fields" });
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

        if(!user){
            return res.status(400).send({ message: "User is not registered" });
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(expectedHash !== user.authentication.password){
            return res.status(403).send({ message: "Wrong password" });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie("todo-node-cookie", user.authentication.sessionToken, {domain: "localhost", path: "/"});

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const register = async(req: express.Request, res: express.Response) => {
    try{
        const { username, email, password } = req.body;
        
        if(!username || !email || !password){
            return res.status(400).send({ message: "Missing fields" });
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).send({ message: "User already exists" });
        }

        const salt = random();
        
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        return res.status(201).json(user);

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}