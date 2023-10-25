
import { createUser, getUserByEmail } from '../db/users.db';
import express from 'express'
import { authentication, random } from '../helpers/index';



export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields, couldn't login" });
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password")

        if(!user) {
            return res.status(400).json({ message: "User doesn't registered, couldn't login" });
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(expectedHash !== user.authentication.password) {
            return res.status(403).json({ message: "Wrong password, couldn't login" });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie("netflix-backend-cookie", user.authentication.sessionToken, { domain: "localhost", path: "/" });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while logging in the user" });
    }
}


export const register = async(req: express.Request, res: express.Response) => {
    try {
        const  { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing required fields, couldn't register" });
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({ message: "User already exists, couldn't register" });
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
        return res.status(500).json({ message: "Error while registering the user" });
    }
}