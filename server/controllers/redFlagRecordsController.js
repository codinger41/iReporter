/* eslint-disable no-dupe-class-members */
/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';
import Records from '../models/recordsModel';
import records from '../data/records';

const { validationResult } = ExpressValidator;

export default class redFlagRecordsController {
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
  static async addRedFlagRecord(req, res) {
    const redFlag = req.body;
    // get all errors from express validator
    const errors = validationResult(req).array().map(error => error.msg);
    // pick last record from records array, check it's id
    // the last record's id + 1 is the new record's id
    if (errors.length < 1) {
      redFlag.createdBy = req.user.id;
      redFlag.videos = redFlag.video || '';
      redFlag.images = redFlag.images || '';
      redFlag.status = 'draft';
      redFlag.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');
      redFlag.type = 'red-flag';
      const record = await Records.createRecord(redFlag);
      res.json({
        status: 200,
        data: [
          {
            id: record.rows[0].id,
            message: 'Created red-flag record',
          },
        ],
      });
    } else {
      res.json({
        status: 400,
        error: errors,
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
        status: 204,
        data: [],
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

  static async getSpecificRedFlagRecord(req, res) {
    const record = await Records.findOneById(Number(req.params.id));
    if (record.rowCount === 1) {
      res.json({
        status: 200,
        data: [record.rows[0]],
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
      // get all errors from express validator
      const errors = validationResult(req).array().map(error => error.msg);
      if (errors.length < 1) {
        record.location = req.body.location;
        res.json({
          status: 200,
          data: [{
            id: record.id,
            message: 'Updated red-flag record\'s location',
          }],
        });
      } else {
        res.json({
          status: 400,
          error: errors,
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
      const errors = validationResult(req).array().map(error => error.msg);
      if (errors.length < 1) {
        record.comment = req.body.comment;
        res.json({
          status: 200,
          data: [
            {
              id: record.id,
              message: 'Updated red-flag record\'s comment',
            },
          ],
        });
      } else {
        res.json({
          status: 400,
          error: errors,
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
    // make an array containing all the ids of each record and pick the index from there.
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
