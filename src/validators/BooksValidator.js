const joi = require('joi');

const bookValidation = async(req, res, next) => {
    try {
        const bookSchema = joi.object({
            title: joi.string().required().messages({"string.title": "book title is required"}),
            author: joi.string().required().messages({"string.author": "book author name is required"}),
            summary: joi.string().required().messages({"string.summary": "book summary is required"}),

        })
        const data = req.body;
        await bookSchema.validateAsync(data, {allowUnknown: true, errors: { wrap: {label: ''}}})
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
            data: []
        })
    }
    next()
}

const editBookValidation = async(req, res, next) => {
    try {
        const bookSchema = joi.object({
            id: joi.string().required().messages({"string.id": "book id is required"}),

        })
        const data = req.body;
        await bookSchema.validateAsync(data, {allowUnknown: true, errors: { wrap: {label: ''}}})
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
            data: []
        })
    }
    next()
}

const deleteBookValidation = async(req, res, next) => {
    try {
        const bookSchema = joi.object({
            id: joi.string().required().messages({"string.id": "book id is required"}),

        })
        const data = req.query;
        await bookSchema.validateAsync(data, {allowUnknown: true, errors: { wrap: {label: ''}}})
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
            data: []
        })
    }
    next()
}

module.exports = {
    bookValidation,
    editBookValidation,
    deleteBookValidation
}