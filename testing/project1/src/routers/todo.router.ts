import express from 'express';

import { getAllTodos, getSingleTodo, createTodoWithDetails, deleteTodo, updateTodo, getUserTodos } from '../controllers/todo.controller';
import { isAuthenticated, isOwner } from '../middlewares/index';



export default (router: express.Router): void => {
    router.get('/todos', getAllTodos);
    router.get('/todos/:id', getSingleTodo);
    router.get('/todos/user/:userId', isAuthenticated, isOwner, getUserTodos);
    router.post('/todos', createTodoWithDetails);
    router.delete('/todos/:id', deleteTodo);
    router.patch("/todos/:id", updateTodo)
}