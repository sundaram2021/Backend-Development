import { login, register } from '../controllers/auth.controller';
import express from 'express';


export default (router: express.Router): void => {
    router.post("/auth/register", register);
    router.post("/auth/login", login);
}