import faker from 'faker';
import records from '../data/records';

export default class RecordsController {
  /**
   * @description - Add a new red-flag record
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */
  static addRedFlagRecord(req, res) {
    const { body } = req;
    const {
      location, comment,
    } = body;
    if (!location || !comment) {
      res.json({
        status: 400,
        error: 'Please fill in the location and comment.',
      });
    } else {
      body.createdBy = 1;
      body.createdOn = faker.date.recent();
      body.id = faker.random.number();
      records.push(req.body);
      res.json({
        status: 200,
        data: [
          {
            id: body.id,
            message: 'Created red-flag record',
          },
        ],
      });
    }
  }

  /**
   * @description - Get all red-flag records.
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */

  static getAllRedFlagRecords(req, res) {
    const redFlagRecords = records.filter(record => record.type === 'red-flag');
    if (redFlagRecords.length >= 1) {
      res.json({
        status: 200,
        data: redFlagRecords,
      });
    } else {
      res.json({
        status: 404,
        message: 'There are no red-flag records.',
      });
    }
  }
}
