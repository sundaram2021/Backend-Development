import { isAuthenticated, isAdmin } from "../middlewares/index.js";
import { createProductByNameAndPrice, deleteProduct, getAllProducts, updateProduct, getAllProductById } from "../controllers/productController.js"
import express from 'express';


export default (router: express.Router): void => {
    router.get('/products', isAuthenticated, isAdmin, getAllProducts);
    router.get('/products/:id', isAuthenticated, isAdmin, getAllProductById);
    router.delete('/users/:id', isAuthenticated, isAdmin, deleteProduct);
    router.patch("/users/:id", isAuthenticated, isAdmin, updateProduct)
    router.post("/products", isAuthenticated, isAdmin, createProductByNameAndPrice)
}