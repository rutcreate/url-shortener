import mongoose from 'mongoose'

// create schema
const schema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    custom: {
        type: Boolean
    }
})

// create model
const ShortenUrl = mongoose.model('ShortenUrl', schema)

export default ShortenUrl
