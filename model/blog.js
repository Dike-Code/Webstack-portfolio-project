/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        banner: {
            type: String,
            required: true,
        },
        nugget: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;
