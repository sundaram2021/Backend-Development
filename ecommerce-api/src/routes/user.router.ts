import { isAdmin, isAuthenticated, isOwner, isAdminOrOwner } from '../middlewares/index';
import { deletingUserById, gettingUserById, gettingUsers, postUser, updatingUserByDetails } from '../controllers/user.controller';
import express from 'express';

export default (router: express.Router): void => {
    router.get("/users", isAuthenticated, gettingUsers);
    router.get("/users/:id", isAuthenticated, isOwner, gettingUserById);
    router.post("/users", postUser);
    router.put("/users/:id", isAuthenticated, isAdminOrOwner, updatingUserByDetails);
    router.delete("/users/:id", isAuthenticated, isAdminOrOwner, deletingUserById);
}