import ExpressValidator from 'express-validator/check';
import User from '../models/userModel';
import { generateToken } from '../helpers/authToken';
import errorHandler from '../helpers/errorhandler';

const { validationResult } = ExpressValidator;

export default class UserController {
  static async signUp(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const userObj = req.body;
      const user = await User.createUser(userObj);
      if (!(user.rowCount === 1)) {
        // 'user' is an error here.
        const error = user;
        res.json({
          status: 400,
          error: errorHandler.find(err => err.code === error.code).message,
        });
      } else {
        const token = generateToken(user.rows[0]);
        res.json({
          status: 200,
          data: [
            {
              token,
              user: user.rows[0],
            },
          ],
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
