import express from 'express';  

import { deleteUser, getAllUsers, updateUser, getSingleUser } from '../controllers/user.controller';
import { isAuthenticated, isOwner } from '../middlewares/index';

export default (router: express.Router): void => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, isOwner, getSingleUser);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser)
}