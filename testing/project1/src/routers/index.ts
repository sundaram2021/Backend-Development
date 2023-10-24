import express from 'express';
import user from './user.router';
import auth from './auth.router';
import todo from './todo.router';

const router = express.Router();

export default (): express.Router => {
    auth(router)
    user(router)
    todo(router)

    return router;
}