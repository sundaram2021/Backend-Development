import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    userId: { type: String, required: true },
})

export const TodoModel = mongoose.model('Todo', todoSchema);

export const getTodos = () =>  TodoModel.find({}).exec();
export const getTodoById = (id: string) => TodoModel.findById({_id: id});
export const createTodo = (todo: Record<string, any>) => new TodoModel(todo).save().then((todo) => todo.toObject());
export const deleteTodoById = (id: string) => TodoModel.findByIdAndDelete({_id: id});
export const updateTodoById = (id: string, update: Record<string, any>) => TodoModel.findByIdAndUpdate(id, update, { new: true });
export const getTodosByUserId = (userId: string) => TodoModel.find({ _id: userId }).exec();