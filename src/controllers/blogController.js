const db = require('../models');

const Blog = db.blogs;

module.exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if(!title || !description) {
      throw new Error('All fields must be filled');
    }

    const blog = await Blog.create({
      title: title,
      description: description
    });

    res.status(201).json({
      message: 'Blog post created successfully',
      blog: blog
    })
    
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong creating blog',
      error: error.message
    })
  }
};

module.exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findAll({
      where: { id: id},
    });
    
    if(!blog.length) {
      res.status(404).json({
        message: 'Blogs not found'
      })
    }

    res.status(200).json({
      message: 'Blog fetched successfully',
      blog: blog
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong getting all blogs',
      error: error.message
    })
  }
};

module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({});
    
    if(!blogs.length) {
      res.status(404).json({
        message: 'Blogs not found'
      })
    }

    res.status(200).json({
      message: 'Blog(s) fetched successfully',
      blogs: blogs
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong getting all blogs',
      error: error.message
    })
  }
};

module.exports.updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if(!title || !description) throw new Error(`All fields must be filled`);

    const updatedBlog = await Blog.update({
      title: title,
      description: description
    }, {
      where: { id: id}
    })

    if(!updatedBlog) throw new Error(`Blog can not be updated`);

    // Getting the particular blog update to return to the client
    const blogUpdated = await Blog.findAll({
      where: { id: updatedBlog}
    })

    res.status(200).json({
      message: 'Blog updated successfully',
      updatedBlog: blogUpdated
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong updating blog',
      error: error.message
    })
  }
};

module.exports.deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.destroy({
      where: { id: id}
    });

    res.status(200).json({
      message: 'Blog deleted successfully',
      blog: blog
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong deleting blog',
      error: error.message
    })
  }
};