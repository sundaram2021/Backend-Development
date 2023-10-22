import express from 'express';
import authentication from './authentication.js';
import user from './user.js';
import product from './product.js';
import order from './order.js';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    product(router);
    order(router);

    return router
}