const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.use(express.urlencoded({extended : true}));

// Home Page;
router.get('/', (req, res) => {
    Blog.find().sort({createdAt : -1})
        .then((result) => {
            res.render("index", {title : "Home" , blogs : result});
        })
        .catch(err => console.log(err));
});

// Fetching data from user;
router.post('/' ,(req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

// Getting a single blog;
router.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blog-detail', {title : result.title , blog : result});
        })
        .catch(err => console.log(err));
})

// Editing a blog;
router.get('/edit-blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('edit-blog', {title: "Edit-Blog", blog: result})
        })
        .catch(err => console.log(err))
})

router.put('/edit-blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, {title : req.body.title, body : req.body.body, updatedAt : Date.now()})
        .then(() => {
            res.redirect(`/edit-blog/${id}`)
        })
        .catch(err => console.log(err))
})

// Deleting a Blog;
router.delete('/delete-blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

module.exports = router;