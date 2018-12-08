import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class UserModel {
  /**
   * @description - Sign
   * @static
   *
   * @param {object} - User data object
   *
   * @memberof UserModel
   *
   * @returns {object} Class instance
   * */
  static async createUser(userObj) {
    try {
      const {
        firstname, lastname, othernames, phonenumber, email,
        username, password, isadmin, registered,
      } = userObj;

      const query = `
        INSERT INTO users(firstname, lastname, othernames, username, phonenumber, password, email, isadmin, registered)
        VALUES ('${firstname}', '${lastname}', '${othernames}', '${username}', '${phonenumber}', '${password}', '${email}', '${isadmin}', '${registered}')
        RETURNING *
      `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async findOneByUsername(username) {
    try {
      const query = `SELECT * FROM users WHERE username = '${username}' `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }
}
