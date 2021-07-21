const sql = require('../dbmysql.js')

class Blog {
  constructor({ user_id = '', contentText = '', title = '' } = '') {
    this.user_id = user_id
    this.contentText = contentText
    this.title = title
  }

  async Create() {
    if (!this.validateContentBlog()) {
      return { message: 'Please enter a valid content' }
    }

    const result = await sql.promise().query('INSERT INTO Blog SET ?', [this])
    sql.end
    return result
  }

  async updateBlog(data, id) {
    const result = await sql
      .promise()
      .query('UPDATE Blog SET ? WHERE user_id = ? and Blog_id = ?', [
        data,
        this.user_id,
        id,
      ])
    sql.end
    return result[0]
  }

  async deleteaBlog(Blog_id, user_id) {
    const result = await sql
      .promise()
      .query('DELETE FROM Blog WHERE user_id = ? AND Blog_id = ?', [
        user_id,
        Blog_id,
      ])
    sql.end
    return result
  }

  async getBlog(id) {
    const result = await sql
      .promise()
      .query('SELECT * FROM Blog WHERE Blog_id = ?', [id])
    sql.end
    return result[0]
  }

  async getBlogByUserId(user_id) {
    const result = await sql
      .promise()
      .query('SELECT * FROM Blog WHERE user_id = ?', [user_id])
    sql.end
    return result
  }

  async updateBlogAdmin(data, id) {
    const result = await sql
      .promise()
      .query('UPDATE Blog SET ? WHERE Blog_id = ?', [data, id])
    sql.end
    return result
  }

  async deleteBlogAdmin(id) {
    const result = await sql
      .promise()
      .query('DELETE FROM Blog WHERE Blog_id = ?', [id])
    sql.end
    return result
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
