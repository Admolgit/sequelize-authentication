const express = require('express');
const { createBlog, getAllBlogs, getBlog, updateBlogById, deleteBlogById } = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/post', createBlog);

blogRouter.get('/posts', getAllBlogs);

blogRouter.get('/post/:id', getBlog);

blogRouter.put('/post/:id', updateBlogById);

blogRouter.delete('/post/:id', deleteBlogById);

module.exports = blogRouter;