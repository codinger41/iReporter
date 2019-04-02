/* eslint-disable prefer-const */
/* eslint-disable no-dupe-class-members */
/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';
import Records from '../models/recordsModel';

const { validationResult } = ExpressValidator;

export default class RedflagController {
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
      res.status(200).json({
        status: 200,
        data: [
          {
            id: record.rows[0].id,
            message: 'Created red-flag record',
          },
        ],
      });
    } else {
      res.status(400).json({
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

  static async getAllRedFlagRecords(req, res) {
    const redFlagRecords = await Records.findAll({ type: 'red-flag' });
    if (redFlagRecords.rowCount >= 1) {
      res.status(200).json({
        status: 200,
        data: redFlagRecords.rows,
      });
    } else {
      res.status(200).json({
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
      res.status(200).json({
        status: 200,
        data: [record.rows[0]],
      });
    } else {
      res.status(404).json({
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

  static async editRecordLocation(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        fieldName: 'location',
        data: req.body.location,
      };
      const updateRecord = await Records.update(payload);
      res.status(200).json({
        status: 200,
        data: [{
          id: updateRecord.rows[0].id,
          message: 'Updated red-flag record\'s location',
        }],
      });
    } else {
      res.status(400).json({
        status: 400,
        error: errors,
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

  static async editRecordComment(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        fieldName: 'comment',
        data: req.body.comment,
      };
      const updateRecord = await Records.update(payload);
      res.status(200).json({
        status: 200,
        data: [{
          id: updateRecord.rows[0].id,
          message: 'Updated red-flag record\'s comment',
        }],
      });
    } else {
      res.status(400).json({
        status: 400,
        error: errors,
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

  static async deleteARecord(req, res) {
    const deleteRecord = await Records.deleteById(req.params.id);
    res.status(200).json({
      status: 200,
      data: [{
        id: deleteRecord.rows[0].id,
        message: 'Red-flag record has been deleted.',
      }],
    });
  }

  static async getAllRedFlagRecordsByUser(req, res) {
    let { query: { fieldName, fieldValue } } = req;
    fieldValue = fieldValue === 'id' ? req.user.id : fieldValue;
    const redFlagRecords = await Records.findAll({ fieldName, fieldValue });
    if (redFlagRecords.rowCount >= 1) {
      res.status(200).json({
        status: 200,
        data: redFlagRecords.rows,
      });
    } else {
      res.status(200).json({
        status: 204,
        data: [],
      });
    }
  }
}
