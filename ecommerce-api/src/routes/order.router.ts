import { isAuthenticated, isAdmin, updateDiffProductQty, updateAddProductQty } from '../middlewares/index';
import { gettingOrders, gettingOrderByIds, deletingOrderById, postOrder } from '../controllers/order.controller';
import express from 'express';

export default (router: express.Router): void => {
    router.get("/orders", isAuthenticated, gettingOrders);
    router.get("/orders/:id", isAuthenticated, gettingOrderByIds);
    router.post("/orders",isAuthenticated, updateDiffProductQty,postOrder);
    // router.put("/users/:id", isAuthenticated, isAdminOrOwner, updatingUserByDetails);
    router.delete("/orders/:id", isAuthenticated, isAdmin, updateAddProductQty,deletingOrderById);
}