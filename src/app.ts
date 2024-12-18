import express from "express";
import "express-async-errors";
import * as dotenv from 'dotenv';
dotenv.config();
import { rateLimit } from 'express-rate-limit'
import {downloadRouter} from "./routes/download";
import cors from "cors";
import {homeRouter} from "./routes/home";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
})

app.use(express.json())
app.use(limiter);
app.use('/', homeRouter);
app.use('/download', downloadRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
