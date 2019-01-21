/* eslint-disable no-dupe-class-members */
/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';
import Records from '../models/recordsModel';

const { validationResult } = ExpressValidator;

export default class InterventionController {
  /**
   * @description - Add a new intervention record
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionController
   *
   * @returns {object} Class instance
   */
  static async addInterventionRecord(req, res) {
    const intervention = req.body;
    // get all errors from express validator
    const errors = validationResult(req).array().map(error => error.msg);
    // pick last record from records array, check it's id
    // the last record's id + 1 is the new record's id
    if (errors.length < 1) {
      intervention.createdBy = req.user.id;
      intervention.videos = intervention.video || '';
      intervention.images = intervention.images || '';
      intervention.status = 'draft';
      intervention.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');
      intervention.type = 'intervention';
      const record = await Records.createRecord(intervention);
      res.status(201).json({
        status: 200,
        data: [
          {
            id: record.rows[0].id,
            message: 'Created intervention record',
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
   * @description - Get all intervention records.
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionRecordsController
   *
   * @returns {object} Class instance
   */

  static async getAllInterventionRecords(req, res) {
    const interventionRecords = await Records.findAll({ type: 'intervention' });
    if (interventionRecords.rowCount >= 1) {
      res.status(200).json({
        status: 200,
        data: interventionRecords.rows,
      });
    } else {
      res.status(200).json({
        status: 204,
        data: [],
      });
    }
  }

  /**
   * @description - Get a specific intervention record by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionRecordsController
   *
   * @returns {object} Class instance
   */

  static async getSpecificInterventionRecord(req, res) {
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
   * @description - Edit a specific intervention record's location by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionRecordsController
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
          message: 'Updated intervention record\'s location',
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
   * @description - Edit a specific intervention record's comment by id
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionRecordsController
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
          message: 'Updated intervention record\'s comment',
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
   * @description - Delete a specific intervention record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof InterventionRecordsController
   *
   * @returns {object} Class instance
   */

  static async deleteARecord(req, res) {
    const deleteRecord = await Records.deleteById(req.params.id);
    res.status(200).json({
      status: 200,
      data: [{
        id: deleteRecord.rows[0].id,
        message: 'intervention record has been deleted.',
      }],
    });
  }
}
