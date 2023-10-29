const express = require('express');
const router = express.Router();
const BooksController = require('../controllers').BooksController
const { bookValidation, editBookValidation, deleteBookValidation } = require('../validators/BooksValidator')

router
    .get('/', async(req, res) => {
        res.json({success: true, message: 'welcome to brewapps testing', data: []})
    })

    .post('/v1/books/add',[bookValidation], async(req, res) => {
        try {
            const { title, author, summary } = req.body;
            let data = await BooksController.addBook(title, author, summary);
            return res.status(200).json({success: true, message: 'One new book added successfully', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

    .get('/v1/books/all', async(req, res) => {
        try {
            let data = await BooksController.allBooks();
            return res.status(200).json({success: true, message: 'All books fetched', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

    .get('/v1/books/id', async(req, res) => {
        try {
            const { id } = req.query;
            let data = await BooksController.bookById(id);
            return res.status(200).json({success: true, message: 'Book with id fetched', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

    .get('/v1/books/title', async(req, res) => {
        try {
            const { title } = req.query;
            let data = await BooksController.bookByName(title);
            return res.status(200).json({success: true, message: 'Book with title fetched', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

    .put('/v1/books/edit', [editBookValidation], async(req, res) => {
        try {
            const { id, title, author, summary } = req.body;
            let data = await BooksController.editBookDetails(id, title, author, summary);
            return res.status(200).json({success: true, message: 'Details saved successfully', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

    .delete('/v1/books/delete',[deleteBookValidation], async(req, res) => {
        try {
            const { id } = req.query;
            let data = await BooksController.deleteBook(id)
            return res.status(200).json({success: true, message: 'Deleted successfully', data: data})
        } catch (error) {
            return res.status(error.status || 500).json({success: false, message: error.message, data: []})
        }
    })

module.exports = router;