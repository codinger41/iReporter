/* eslint-disable no-dupe-class-members */
/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';
import Records from '../models/recordsModel';

const { validationResult } = ExpressValidator;

export default class AdminController {
  /**
   * @description - Add a new intervention record
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof AdminController
   *
   * @returns {object} Class instance
   */

  static async changeRecordStatus(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const record = await Records.findOneById(req.params.id);
      if (record.rowCount === 1) {
        const payload = {
          id: req.params.id,
          fieldName: 'status',
          data: req.body.status,
        };
        const updateRecord = await Records.update(payload);
        res.json({
          status: 200,
          data: [{
            id: updateRecord.rows[0].id,
            message: 'Updated red-flag record\'s status',
          }],
        });
      } else {
        res.json({
          status: 404,
          error: 'No record was found with the given id.',
        });
      }
    } else {
      res.json({
        status: 400,
        error: errors,
      });
    }
  }
}
