
import { isAdmin, isAuthenticated, isOwner, validProduct } from '../middlewares/index.js';
import { deleteOrder, getAllOrders, getOrderByUniqueId, patchOrder, postOrder } from '../controllers/orderController.js';
import express from 'express';


export default (router: express.Router) => {
    router.get("/orders", isAuthenticated, isAdmin,getAllOrders);
    router.get("/order/:id", isAuthenticated, validProduct, getOrderByUniqueId);
    router.post("/order", isAuthenticated, validProduct, postOrder);
    router.delete("/order/:id", isAuthenticated, validProduct, deleteOrder);
    router.patch("/order/:id", isAuthenticated, validProduct, patchOrder);
}