const sql = require('../dbmysql')

class User {
  constructor(
    { username = '', password = '', email = '', name = '', role = '' } = ''
  ) {
    this.username = username
    this.password = password
    this.email = email
    this.name = name.trim().replace(/\s+/, ' ')
    this.role = role
  }

  async Create() {
    if (!this.validateDate()) {
      return { message: 'invalid data user' }
    }

    const result = await sql.promise().query(`INSERT INTO User SET ?`, [this])
    sql.end
    return result
  }

  async getUser(user_id) {
    const result = await sql
      .promise()
      .query(`SELECT * FROM User WHERE user_id = ?`, [user_id])
    sql.end
    return result[0]
  }

  async getUserLogin() {
    const result = await sql
      .promise()
      .query(`SELECT * FROM User WHERE username = ?`, [this.username])
    sql.end
    return result[0]
  }

  async deleteUser(username, email, user_id) {
    const result = await sql
      .promise()
      .query(
        `DELETE FROM User WHERE username = ? AND email = ? AND user_id = ?`,
        [username, email, user_id]
      )
    sql.end
    return result
  }

  async updateUser(data, user_id) {
    const result = await sql
      .promise()
      .query('UPDATE User SET ? WHERE username = ? AND user_id = ?', [
        data,
        this.username,
        user_id,
      ])
    sql.end
    return result[0]
  }

  async updateUserRole(data, user_id) {
    const result = await sql
      .promise()
      .query('UPDATE User SET ? WHERE user_id = ?', [data, user_id])
    sql.end
    return result[0]
  }

  validateDate() {
    if (
      this.username.length < 3 ||
      this.username.length > 20 ||
      !this.username.match(/^[a-zA-Z0-9]+$/)
    ) {
      return false
    }
    if (this.password.length < 6) {
      return false
    }
    if (
      this.email.length < 3 ||
      this.email.length > 20 ||
      !this.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      return false
    }
    if (
      this.name.length < 3 ||
      this.name.length > 20 ||
      !this.name.match(/^[a-zA-Z\s]+$/)
    ) {
      return false
    }

    return true
  }
}

module.exports = User
