const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user',{username:1, name:1})
  response.json(blogs)
})
  
  blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }
  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
      const newblog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
    })
    const savedBlog = await newblog.save()
    
    response.json(savedBlog)
  })

  blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  

  module.exports = blogRouter
