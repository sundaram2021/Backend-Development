import express from 'express'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import  router  from './routers/index';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';

dotenv.config();


const PORT = process.env.PORT || 3000;
export const app = express();
const url = process.env.MONGODB_URL || '';

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

app.get('/', (_req, res) => {
    res.send('Hello World!');
});


mongoose.Promise = Promise;
mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((_err) => {
        console.log('MongoDB connection error');
    })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
