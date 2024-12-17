import express from "express";
import "express-async-errors";
import * as dotenv from 'dotenv';
dotenv.config();
import { rateLimit } from 'express-rate-limit'
import {downloadRouter} from "./routes/download";

const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
})

app.use(express.static('public'));
app.use(limiter);
app.use('/download', downloadRouter);

app.listen(3000, 'localhost', () => {
    console.log('Listening on port http://localhost:3000');
});
