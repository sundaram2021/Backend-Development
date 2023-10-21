import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, required: true },
        sessionToken: { type: String, select: false },
    }, 
})

export const UserModel = mongoose.model('User', userSchema);

export const getUSers = () =>  UserModel.find({}).exec();   
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (user: Record<string, any>) => new UserModel(user).save().then((user) => user.toObject());
export const deleteUserBYId = (id: string) => UserModel.findByIdAndDelete({_id: id});
export const updateUserById = (id: string, update: Record<string, any>) => UserModel.findByIdAndUpdate(id, update, { new: true });   