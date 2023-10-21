import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router/index.js';
import dotenv from "dotenv"
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || '';

const app = express();

app.use(cors(
    {
        origin: true,
        credentials: true,
    },
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use("/", router());

const server = http.createServer(app);


app.get('/', (_req, res) => {
    res.send('Hello World');
}); 

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((_err) => {
        console.log('MongoDB connection error');
    })

server.listen(6080, () => {
    console.log('Server started on port http://localhost:6080');
})