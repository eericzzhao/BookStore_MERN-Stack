import express from "express"; 
import { PORT, mongoDBURL } from "./config.js"; //Separate ports through different files
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

// index.js: Starter for our project
const app = express(); // Variable for express

// in order to parse incoming requests
app.use(express.json());

// 11. Handling CORS Policy (Only clients with the Origin can Access the Server)
app.use(cors());
// Allowing Custom Origins
// app.use (
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

//Creating a route with Express (to fix the /GET issue and to get a resource from server)
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send(`Welcome to MERN Stack Tutorial`);
});

app.use('/books', booksRoute);

// Mongoose library
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        // Listening to our port
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); //Means: Working server
        });
    })
    .catch((error) => {
        console.log(error);
    });