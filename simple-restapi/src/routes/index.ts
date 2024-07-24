import express from 'express';
import authRouter from './auth.router';
import usersRouter from './user.router';


const router = express.Router();


export default () : express.Router => {
    authRouter(router);
    usersRouter(router);

    return router;
}