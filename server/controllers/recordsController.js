/* eslint-disable no-dupe-class-members */
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
      // pick last record from records array, check it's id
      // the last record's id + 1 is the new record's id
      const lastRecord = records.reverse()[0];
      body.createdBy = 1;
      body.createdOn = faker.date.recent();
      body.id = lastRecord.id + 1;
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

  /**
   * @description - Get a specific red-flag record by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */

  static getSpecificRedFlagRecord(req, res) {
    const record = records.find(singleRecord => singleRecord.id === Number(req.params.id));
    if (record) {
      res.json({
        status: 200,
        data: [record],
      });
    } else {
      res.json({
        status: 404,
        error: 'No record was found with the given id.',
      });
    }
  }

  /**
   * @description - Edit a specific red-flag record's location by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */

  static editRecordLocation(req, res) {
    const record = records.find(singleRecord => singleRecord.id === Number(req.params.id));
    if (record) {
      const { location } = req.body;
      if (!location) {
        res.json({
          status: 400,
          error: 'Location is required.',
        });
      } else {
        record.location = location;
        res.json({
          status: 200,
          data: [{
            id: record.id,
            message: 'Updated red-flag record\'s location',
          }],
        });
      }
    } else {
      res.json({
        status: 404,
        error: 'No record was found with the given id.',
      });
    }
  }

  /**
   * @description - Edit a specific red-flag record's comment by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */

  static editRecordComment(req, res) {
    const record = records.find(singleRecord => singleRecord.id === Number(req.params.id));
    if (record) {
      const { comment } = req.body;
      if (!comment) {
        res.json({
          status: 400,
          error: 'Comment is required.',
        });
      } else {
        record.comment = comment;
        res.json({
          status: 200,
          data: [
            {
              id: record.id,
              message: 'Updated red-flag record\'s comment',
            },
          ],
        });
      }
    } else {
      res.json({
        status: 404,
        error: 'No record was found with the given id.',
      });
    }
  }

  /**
   * @description - Delete a specific red-flag record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */

  static deleteARecord(req, res) {
    // make an array containing all the ids of each record and pick the indecx from there.
    const indexOfRecord = records.map(record => record.id).indexOf(Number(req.params.id));
    if (indexOfRecord >= 0) {
      const deleted = records.splice(indexOfRecord, 1);
      if (deleted) {
        res.json({
          status: 200,
          data: [
            {
              id: req.params.id,
              message: 'red-flag record has been deleted',
            },
          ],
        });
      }
    } else {
      res.json({
        status: 404,
        error: 'No record was found with the given id.',
      });
    }
  }
}
