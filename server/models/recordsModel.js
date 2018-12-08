import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class RecordModel {
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
  static async createRecord(record) {
    try {
      const {
        createdOn, createdBy, type, location, status,
        images, videos, comment,
      } = record;

      const query = `
        INSERT INTO records(createdOn, createdBy, type, location, status, images, videos, comment)
        VALUES ('${createdOn}', '${createdBy}', '${type}', '${location}', '${status}', ARRAY[${images}]::TEXT[], ARRAY[${videos}]::TEXT[], '${comment}')
        RETURNING *
      `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  // static async findOneByUsername(username) {
  //   try {
  //     const query = `SELECT * FROM users WHERE username = '${username}' `;
  //     const res = await pool.query(query);
  //     return res;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
