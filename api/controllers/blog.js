const blogRouter = require('express').Router()
const Blog = require('../models/Blog.js')
const User = require('../models/User.js')
const verifyRole = require('../utils/middleware/verifyRole.js')
const verifyToken = require('../utils/middleware/verifyToken.js')

const BLOG_GET_LIMIT = 10
const BLOG_SORT_OPTIONS = {
  UPDATEAT: 'updatedAt',
  TITLE: 'title',
  CREATEDAT: 'createdAt',
}

blogRouter.put('/admin/:id', verifyToken, verifyRole, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const { role } = req

  const userRef = await new User().getUser(user_id)

  if (userRef && !(userRef.role === role))
    return res
      .status(401)
      .json({ message: 'You are not allowed to change this blogs' })

  const data = {}
  for (let x in req.body) {
    data[x] = req.body[x]
  }
  const updateBlog = await new Blog().updateBlogAdmin(data, id)

  if (!!updateBlog.affectedRows)
    return res.status(200).json({ message: 'Blog updated successfully' })

  res.status(400).json({ message: 'Blog not updated' })
})

blogRouter.get('/:sort?/:directionsort?/:page?', async (req, res) => {
  const { sort, directionsort, page = 0 } = req.params
  const sortOption = sort
    ? BLOG_SORT_OPTIONS[sort]
      ? BLOG_SORT_OPTIONS[sort]
      : BLOG_SORT_OPTIONS.UPDATEAT
    : BLOG_SORT_OPTIONS.UPDATEAT
  const offset = +page * BLOG_GET_LIMIT
  const BlogList = await new Blog().getBlogList(
    sortOption,
    BLOG_GET_LIMIT,
    directionsort,
    offset
  )

  if (!BlogList.length) {
    return res.status(404).json({ error: 'Blogs not found' })
  }
  res.status(202).json(BlogList)
})

blogRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const getBlogById = await new Blog().getBlog(id)

  if (!getBlogById) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  res.status(200).json(getBlogById)
})

blogRouter.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const data = {}
  for (let x in req.body) {
    data[x] = req.body[x]
  }
  const updateBlog = await new Blog({ user_id }).updateBlog(data, id)
  if ('affectedRows' in updateBlog) {
    return res.status(200).json({ message: 'Blog update successful' })
  }
  res.status(400).json({ message: 'it not possible to update' })
})

blogRouter.post('/', verifyToken, async (req, res) => {
  const { contentText = '', title = '' } = req.body
  const user_id = req.user_id
  const newBlog = await new Blog({
    contentText,
    title,
    user_id,
  }).Create()

  if ('message' in newBlog) {
    return res.status(400).json(newBlog)
  }

  if (newBlog.affectedRows) {
    return res.status(201).json({
      message: 'Blog created successfully',
      id: newBlog.insertId,
    })
  }

  res.status(400).json({ message: 'it not possible to create' })
})

blogRouter.delete('/admin/:id', verifyToken, verifyRole, async (req, res) => {
  const { id } = req.params
  const { role, user_id } = req

  const userRef = await new User().getUser(user_id)

  if (userRef && !(userRef.role === role))
    return res
      .status(401)
      .json({ message: 'You are not allowed to change this blogs' })

  const deleteBlog = await new Blog().deleteBlogAdmin(id)

  if (!!deleteBlog.affectedRows)
    return res.status(200).json({ message: 'Blog deleted successfully' })

  res.status(400).json({ message: 'it not possible to delete' })
})

blogRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const deleteBlog = await new Blog().deleteBlog(id, user_id)
  if (!!deleteBlog.affectedRows) {
    return res.status(200).json({ message: 'Blog deleted successfully' })
  }
  res.status(400).json({ message: 'it not possible to delete' })
})

module.exports = blogRouter
