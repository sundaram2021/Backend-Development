import express from 'express';
import authRouter from './auth.router';
import usersRouter from './user.router';
import productRouter from './product.router';
import orderRouter from './order.router';

const router = express.Router();


export default () : express.Router => {
    authRouter(router);
    usersRouter(router);
    productRouter(router);
    orderRouter(router);

    return router;
}