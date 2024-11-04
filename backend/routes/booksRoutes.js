// 10. Refactor node.js with Express Router
import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// 6. Route to Save a new Book
router.post('/', async(request, response) => {
    try {
        if ( //If statement checking if it has the correct fields
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        
        const book = await Book.create(newBook); //Saving the result

        return response.status(201).send(book); //Sending the book to the client
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get ALL the books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({}); // Gets list of all books

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// 7. Route to get ONE book from database by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id); // Gets list of all books

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// 8. Route for Updating a Book's Fields
router.put('/:id', async (request, response) => {
    try {
        if ( 
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear
        ) { //Any missing
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;
        
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json( { message: 'Book not found'});
        }

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}); //.put() updates a resource

// 9. Route for Deleteing a Book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json( { message: 'Book Not Found'});
        }

        return response.status(200).send( { message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;