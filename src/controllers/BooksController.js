const Books = require('../models/Books');
const { errorHandler } = require('../utils/CustomError')

module.exports = {
    addBook: async(title, author, summary) => {
        try {
            let exists = await Books.findBookByTitle(title)
            if(exists) {
                throw await errorHandler('Book with this title already exists', 406)
            }
            let add = await Books.addBook({title, author, summary})
            return add;
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    },

    allBooks: async(req, res) => {
        try {
            let data = await Books.getAllBooks();
            return data;            
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    },

    bookById: async(id) => {
        try {
            let data = await Books.findBookById(id)
            return data;
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    },

    bookByName: async(title) => {
        try {
            let data = await Books.findBookByTitle(title);
            if(!data) {
                throw await errorHandler('No book found with this title', 404)
            }
            return data;
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    },

    editBookDetails: async(id, title, author, summary) => {
        try {
            let exists = await Books.findBookById(id)
            let update = await Books.editBookDetails(id, title || exists.title, author || exists.author, summary || exists.summary)
            return update
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    },

    deleteBook: async(id) => {
        try {
            await Books.findBookById(id)
            let success = await Books.deleteBookById(id);
            return success;
        } catch (error) {
            throw await errorHandler(error.message, 500)
        }
    }
}