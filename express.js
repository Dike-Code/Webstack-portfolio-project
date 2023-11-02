/** @format */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog');

// mongoDB connect
const dbUrl =
    'mongodb+srv://dike:hellow@dike-code.zjfjv0l.mongodb.net/dike?retryWrites=true&w=majority';
mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        return app.listen(3000) + console.log('db connected');
    })
    .catch((err) => console.log(err));

// set enigine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));
// urlEncode
app.use(express.urlencoded({ extended: true }));
// morgan
app.use(morgan('dev'));

// app.listen(3000);

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Render allblogs in view
app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', {
                headTitle: 'Blogs',
                blogs: result,
                title: 'All blogs',
            });
        })
        .catch((err) => console.log(err));
});

//POST BLOG DATAS
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('blogs');
        })
        .catch((err) => { console.log(err) });
});

// blogDetails
app.get('/blogs/:id', (req, res) => {
    const ids = req.params.id;
    Blog.findById(ids)
        .then((result) => {
            res.render('detail', { title: 'Blog Details', blog: result });
        })
        .catch((err) => {
            console.log(err)
        });
});

// Render the blog field
app.get('/create', (req, res) => {
    res.status(200).render('createBlog', { create: 'Creat-Blog' });
});

app.use((req, res) => {
    res.status(404).render('404');
});
