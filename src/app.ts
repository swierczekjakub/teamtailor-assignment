import express from "express";
import "express-async-errors";
import * as dotenv from 'dotenv';
dotenv.config();
import {downloadRouter} from "./routes/download";

const app = express();

app.use(express.static('public'));
app.use('/download', downloadRouter);

app.listen(3000, 'localhost', () => {
    console.log('Listening on port http://localhost:3000');
});
