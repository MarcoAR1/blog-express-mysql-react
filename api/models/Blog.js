const sql = require('../dbmysql.js')

class Blog {
  constructor({ user_id = '', contentText = '', title = '', img = '' } = '') {
    this.user_id = user_id
    this.contentText = contentText
    this.title = title
    this.img = img
    this.createdAt = new Date().toISOString()
  }

  async Create() {
    if (!this.validateContentBlog()) {
      return { message: 'Please enter a valid content' }
    }
    const result = await sql.promise().query('INSERT INTO Blog SET ?', [this])

    return result[0]
  }

  async getBlog(id) {
    const result = await sql
      .promise()
      .query('SELECT * FROM Blog WHERE blog_id = ?', [id])

    return result[0][0]
  }

  async getBlogByUserId(user_id) {
    const result = await sql
      .promise()
      .query('SELECT * FROM Blog WHERE user_id = ?', [user_id])

    return result
  }

  async getBlogList(BLOGORDER, BLOGLIMIT, DESCORASC = '', OFFSET) {
    DESCORASC = DESCORASC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
    const result = await sql
      .promise()
      .query(
        'SELECT Blog.blog_id , Blog.contentText , Blog.createdAt, Blog.title, Blog.updatedAt, Blog.img, User.authorname, User.avatar FROM Blog inner join User on Blog.user_id = User.user_id ORDER BY ?? ' +
          DESCORASC +
          ' LIMIT ? OFFSET ? ',
        [BLOGORDER, BLOGLIMIT, OFFSET]
      )
    return result[0]
  }

  async updateBlog(data, id) {
    const result = await sql
      .promise()
      .query('UPDATE Blog SET ? WHERE user_id = ? and blog_id = ?', [
        data,
        this.user_id,
        id,
      ])

    return result[0]
  }

  async updateBlogAdmin(data, id) {
    const result = await sql
      .promise()
      .query('UPDATE Blog SET ? WHERE blog_id = ?', [data, id])

    return result[0]
  }

  async deleteBlog(blog_id, user_id) {
    const result = await sql
      .promise()
      .query('DELETE FROM Blog WHERE user_id = ? AND blog_id = ?', [
        user_id,
        blog_id,
      ])

    return result[0]
  }

  async deleteBlogAdmin(id) {
    const result = await sql
      .promise()
      .query('DELETE FROM Blog WHERE blog_id = ?', [id])
    return result[0]
  }

  async UpdateLengthBlog(type) {
    const result = await sql
      .promise()
      .query(
        'Update blog_info set blog_info.length = blog_info.length + ? where blog_info.blog_id = 1',
        [type === 'ADD' ? 1 : -1]
      )
    return result[0]
  }

  async getAmountBlogs() {
    const result = await sql.promise().query('SELECT length FROM blog_info')
    return result[0][0]
  }

  validateContentBlog() {
    if (this.contentText.length < 10) {
      return false
    }
    if (this.title.length < 3) {
      return false
    }
    return true
  }
}

module.exports = Blog
