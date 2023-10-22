import http from 'http';    
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from "./router/index.js"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL || "";
const app = express();
const server = http.createServer(app);

app.use(cors(
    {
        origin: true,
        credentials: true
    }
));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/",router());


mongoose.Promise = Promise;
mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((_err) => {
        console.log('MongoDB connection error');
    })

server.listen(5050, () => {
  console.log('Server is listening on port http://localhost:5050');
});
