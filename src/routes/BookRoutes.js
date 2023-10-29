const express = require('express');
const router = express.Router();
const BooksController = require('../controllers').BooksController
const { bookValidation, editBookValidation, deleteBookValidation } = require('../validators/BooksValidator')

router
    .get('/', async(req, res) => {
        res.json({success: true, message: 'welcome to brewapps testing', data: []})
    })

    .post('/v1/books/add',[bookValidation], BooksController.addBook)

    .get('/v1/books/all', BooksController.allBooks)

    .get('/v1/books/id', BooksController.bookById)

    .get('/v1/books/title', BooksController.bookByName)

    .put('/v1/books/edit', [editBookValidation], BooksController.editBookDetails)

    .delete('/v1/books/delete',[deleteBookValidation], BooksController.deleteBook)

module.exports = router;