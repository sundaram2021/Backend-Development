import { isAdmin, isAuthenticated } from '../middlewares/index';
import { postProduct, deletingProductByIds, updatingProductByDetails, gettingProductByIds, gettingProducts } from '../controllers/product.controller';
import express from 'express';

export default (router: express.Router): void => {
    router.get("/products", isAuthenticated, gettingProducts);
    router.get("/products/:id", isAuthenticated, gettingProductByIds);
    router.post("/products", isAuthenticated, isAdmin, postProduct);
    router.put("/products/:id", isAuthenticated, isAdmin, updatingProductByDetails);
    router.delete("/products/:id", isAuthenticated, isAdmin, deletingProductByIds);
}