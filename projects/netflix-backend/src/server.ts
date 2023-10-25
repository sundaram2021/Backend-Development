import express from 'express';  
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routers/index';


dotenv.config();
const PORT  = process.env.PORT || 3000;
const URL = process.env.MONGODB_URL || '';
const app = express();


app.use(cors(
    {
        origin: true,
        credentials: true,
    }
));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

mongoose.Promise = global.Promise;
mongoose.connect(URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
