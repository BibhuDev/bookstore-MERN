import express from "express";
import { book } from "../models/bookModels.js";
const Router = express.Router();


// route for saving books 

Router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'send all the required details'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const BOOK = await book.create(newBook);
        return res.status(201).send(BOOK);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// for showing all the saved books we use get method 

Router.get('/', async (req, res) => {
    try {
        const books = await book.find({});

        return res.status(201).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// for getting one book by its id 

Router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const books = await book.findById(id);

        return res.status(201).json(books);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route to update a book

Router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'send all the required details'
            });
        }

        const { id } = req.params;
        const result = await book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(400).send({
                message: 'book not found'
            });
        }

        return res.status(200).send("message: Book updated successfully");

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// route to delete a book 

Router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const result = await book.findByIdAndDelete(id);

        if (!result) {
            return res.status(400).send({
                message: 'book not found'
            });
        }

        return res.status(200).send("message: Book deleted successfully");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default Router;