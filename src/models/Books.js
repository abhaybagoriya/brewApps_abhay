const mongoose = require('mongoose');
const { errorHandler } = require('../utils/CustomError')

const bookSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        summary: { type: String, required: true }
    }, { timestamps: true }
)

const books = mongoose.model('books', bookSchema)

module.exports = {
    findBookByTitle: async(title) => {
        try {
            let data = await books.findOne({title: title});
            if(data != null) {
                return data;
            } else {
                return false;
            }
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    },

    addBook: async(obj) => {
        try {
            let data = await books.create(obj);
            return data;
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    },

    getAllBooks: async() => {
        try {
            let data = await books.find()
            return data;
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    },

    findBookById: async(id) => {
        try {
            let data = await books.findOne({_id: id});
            if(data != null) {
                return data;
            } else {
                throw await errorHandler('No Book Found with this id', 404);
            }
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    },

    editBookDetails: async(id, title, author, summary) => {
        try {
            let data = await books.updateOne(
                {_id: id},
                {
                    $set: {
                        title: title,
                        author: author,
                        summary: summary
                    }
                }
            );

            if(data.modifiedCount > 0) {
                return true;
            } else {
                throw await errorHandler("Some error occured while updating book details", 406)
            }
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    },

    deleteBookById: async(id) => {
        try {
            let data = await books.deleteOne({_id: id});
            if(data.deletedCount > 0) {
                return true;
            } else {
                throw await errorHandler("Some error occured while deleting book", 406)
            }
        } catch (error) {
            throw await errorHandler(error.message, 406)
        }
    }
}