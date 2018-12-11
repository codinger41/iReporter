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

  static async findOneById(id) {
    try {
      const query = `SELECT * FROM records WHERE id = ${id} `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async findAll() {
    try {
      const query = 'SELECT * FROM records';
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async update(payload) {
    try {
      const { fieldName, data, id } = payload;
      const query = `
        UPDATE records
        SET ${fieldName} = '${data}'
        WHERE id = ${Number(id)}
        RETURNING *
      `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }

  static async deleteById(id) {
    try {
      const query = `
        DELETE FROM records
        WHERE id = ${Number(id)}
        RETURNING id
      `;
      const res = await pool.query(query);
      return res;
    } catch (error) {
      return error;
    }
  }
}
