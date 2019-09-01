import mongoose from 'mongoose'

// create schema
const schema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    }
})

// create model
const ShortenUrl = mongoose.model('ShortenUrl', schema)

export default ShortenUrl
