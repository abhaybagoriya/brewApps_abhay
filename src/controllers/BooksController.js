const Books = require('../models/Books');

module.exports = {
    addBook: async(req, res) => {
        try {
            const { title, author, summary} = req.body;
            let exists = await Books.countDocuments({title: title});
            if(exists > 0) {
                return res.status(406).json({success: false, message: 'Book with this title already exists', data: []})
            }
            let add = await Books.create({title, author, summary})
            if(add) {
                return res.status(200).json({success: true, message: 'One new book added successfully', data: add})
            } else {
                return res.status(406).json({success: true, message: 'Some error occured', data: []})
            }
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    },

    allBooks: async(req, res) => {
        try {
            let data = await Books.find();
            return res.status(200).json({success: true, message: 'All books fetched', data: data})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    },

    bookById: async(req, res) => {
        try {
            const { id } = req.query;
            let data = await Books.findOne({_id: id});
            if(data != null) {
                return res.status(200).json({success: true, message: 'Book with id fetched', data: data})
            } else {
                return res.status(404).json({success: true, message: 'No book found with this id', data: []})
            }
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    },

    bookByName: async(req, res) => {
        try {
            const { title } = req.query;
            let data = await Books.findOne({title: title});
            if(data != null) {
                return res.status(200).json({success: true, message: 'Book with title fetched', data: data})
            } else {
                return res.status(404).json({success: true, message: 'No book found with this title', data: []})
            }
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    },

    editBookDetails: async(req, res) => {
        try {
            const { id, title, author, summary } = req.body;
            let exists = await Books.findOne({_id: id});
            if(exists === null) {
                return res.status(404).json({success: false, message: 'No book found with this id', data: []})
            } else {
                let update = await Books.updateOne(
                    {_id: id},
                    {
                        $set: {
                            title: title || exists.title,
                            author: author || exists.author,
                            summary: summary || exists.summary
                        }
                    }
                );

                if(update.modifiedCount > 0) {
                    return res.status(200).json({success: true, message: 'Details saved successfully', data: []})
                } else {
                    return res.status(406).json({success: false, message: 'Some error occured', data: []})
                }
            }
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    },

    deleteBook: async(req, res) => {
        try {
            const { id } = req.query;
            let success = await Books.deleteOne({_id: id});
            if(success.deletedCount > 0) {
                return res.status(200).json({success: true, message: 'Book Deleted Successfully', data: []})
            } else {
                return res.status(406).json({success: false, message: 'Book with this id not exists', data: []})
            }
        } catch (error) {
            return res.status(500).json({success: false, message: error.message, data: []})
        }
    }
}