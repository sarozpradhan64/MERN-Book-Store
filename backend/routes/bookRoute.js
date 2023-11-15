import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// book post method 
router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear" });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        return response.status(201).json(book);
    }
    catch (err) {
        console.log(err);
        response.status(500).send({ message: err.message });
    }
});



//all books get method
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({ length: books.length, data: books });
    }
    catch (err) {
        console.log(err);
        response.status(200).json({ message: err.message });
    }
});

// book detail route
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    }
    catch (err) {
        response.status(500).send({ message: err.message });
    }
});


// update books by id  
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear" });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).json({ message: "Book updated successfully" });
    }
    catch (err) {
        console.log(err);
        response.status(500).send({ message: err.message });
    }
});


router.delete("/:id", async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).json({ message: "Book deleted successfully" });
    }
    catch (err) {
        console.log(err);
        response.status(500).send({ message: err.message });
    }
});


export default router;