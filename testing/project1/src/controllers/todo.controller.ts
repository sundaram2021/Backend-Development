import { createTodo, deleteTodoById, getTodoById, getTodos, getTodosByUserId } from '../db/todo.db';
import express from 'express';

export const getAllTodos = async(req: express.Request, res: express.Response) => {
    try {
        const todos = await getTodos();

        if(!todos){
            return res.status(404).json({ error: 'todos not found' });
        }

        return res.status(200).json({ todos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while getting the todos' });
    }
}

export const getSingleTodo = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        const todo = await getTodoById(id);

        if(!todo){
            return res.status(404).json({ error: 'todo not found' });
        }

        return res.status(200).json({ todo });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while getting the todo' });
    }
}

export const createTodoWithDetails = async(req: express.Request, res: express.Response) => {
    try {
        const { title, description, completed, userId } = req.body;

        console.log(title, description, completed, userId);
        

        if (!title) {
            return res.status(400).json({ error: 'title is required' });
        }
        if (!description) {
            return res.status(400).json({ error: 'description is required' });
        }
        if (completed === undefined || completed === null) {
            return res.status(400).json({ error: 'completed is required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const todo = await createTodo({
            title,
            description,
            completed,
            userId
        });

        // console.log(todo);
        

        if(!todo){
            return res.status(404).json({ error: 'todo not found' });
        }

        return res.status(200).json({ todo });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while creating the todo' });
    }
}


export const deleteTodo = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        
        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        const todo = await deleteTodoById(id);

        if(!todo){
            return res.status(404).json({ error: 'todo not found' });
        }

        return res.status(200).json({ todo });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while deleting the todo' });
    }
}

export const updateTodo = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ error: 'id is required' });
        }

        const todo = await getTodoById(id);

        if(!todo){
            return res.status(404).json({ error: 'todo not found' });
        }

        const { title, description, completed } = req.body;

        if(!title && !description && !completed){
            return res.status(400).json({ error: 'title, description and completed are required' });
        }

        todo.title = title;
        todo.description = description;
        todo.completed = completed;

        const updatedTodo = await todo.save();

        return res.status(200).json({ todo: updatedTodo });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while updating the todo' });
    }
}

export const getUserTodos = async(req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({ error: 'userId is required' });
        }

        const todos = await getTodosByUserId(userId);

        if(!todos){
            return res.status(404).json({ error: 'todos not found' });
        }

        return res.status(200).json({ todos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error while getting the todos' });
    }
}
