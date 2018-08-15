const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RepositorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    forks: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    bookmarked: {
        type: Boolean,
        requred: true
    }
});

module.exports = Repository = mongoose.model('repository', RepositorySchema);