import express from "express";
import "express-async-errors";

const app = express();

app.use(express.static('public'));

app.listen(3000, 'localhost', () => {
    console.log('Listening on port http://localhost:3000');
});
