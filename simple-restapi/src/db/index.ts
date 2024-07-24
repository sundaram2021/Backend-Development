import mongoose, { Schema, model, connect } from "mongoose";
import { MongoClient } from "mongodb";
import { User } from "./users.db";
require("dotenv").config();
// imort User

// const uri = process.env.MONGO_URI;

// interface IPost {
//     content: string;
//     author: string;
// }

// const postSchema = new Schema<IPost>({
//     content: { type: String, required: true },
//     author: { type: String, required: true },
// });

// const Post = model<IPost>("Post", postSchema);

export const client = new MongoClient(process.env.MONGO_URI!);
export const db = client.db("node-ts-api");

const connectToMongoDb = async (): Promise<object> => {
    try {
        await connect(process.env.MONGO_URI!);
        await User.createCollection();
        console.log("Connected to MongoDB");
        return { status: 200, msg: "OK - Connected" };
    } catch (err) {
        console.error(err);
        return { status: 400, msg: "Bad Request - Could Not Connect" };
    }
};

export default connectToMongoDb;
