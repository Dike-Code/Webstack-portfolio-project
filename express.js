/** @format */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// mongoDB connect
// const dbUrl =
//     'mongodb+srv://dike:hellow@dike-code.zjfjv0l.mongodb.net/?retryWrites=true&w=majority';
// mongoose
//     .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => {
//         return console.log('db connected');
//     })
//     .catch((err) => console.log(err));

// set enigine
app.set('view engine', 'ejs');

app.use(express.static('public'));

// morgan
app.use(morgan('dev'));

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index', { title: 'Home'});
});

app.get('/blogs', (req, res) => {
    const blogs = [
        {
            title: 'First Blog',
            letter: 'Hello, its my first blog and first time of using node js',
        },
        {
            title: 'Second Blog',
            letter: 'Hello, its my first blog and first time of using node js',
        },
        {
            title: 'First Blog',
            letter: 'Hello, its my first blog and first time of using node js',
        },
        {
            title: 'First Blog',
            letter: 'Hello, its my first blog and first time of using node js',
        },
    ];
    res.render('blogs', { title: 'Blogs', blogs, head:'All blogs'});
});

app.get('/create', (req, res) => {
    res.status(200).render('createBlog');
});

app.use((req, res) => {
    res.status(404).render('404');
});
