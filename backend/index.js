import express from "express";
import { PORT, DBURI } from "./config.js";
import mongoose from "mongoose";
import { book } from "./models/bookModels.js";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';

const app = express();

app.use(express.json());

// main route
app.get('/', (req,res)=>{
    console.log(req.url);
    return res.status(234).send("Bookstore app");
})

//middlware for cors policy 
app.use(
    cors({
    origin: 'http://localhost:5555',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})
);

//middleware for all routes
app.use('/books', booksRoute);

mongoose
    .connect(DBURI)
    .then(() => {
        console.log("DB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    }

    )
    .catch((error) => {
        console.log(error);
    }

    );
