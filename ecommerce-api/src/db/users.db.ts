import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true },
        sessionToken: { type: String, select: false },
    },  
})



export const User = mongoose.model("User", userSchema);


// actions with users
export const createUser = async(user: Record<string, any>) => new User(user).save().then((user) => user.toObject());
export const getAllUsers = () => User.find({}).exec();  
export const getUserById = (id: string) => User.findById({_id: id});
export const getUserByEmail = (email: string) => User.findOne({ email });
export const deleteUserById = (id: string) => User.findByIdAndDelete({_id: id});
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const updateUserById = (_id: string, update: Record<string, any>) => User.findByIdAndUpdate(_id, update, { new: true });