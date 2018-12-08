import ExpressValidator from 'express-validator/check';
import User from '../models/userModel';
import { generateToken } from '../helpers/authToken';

const { validationResult } = ExpressValidator;

export default class UserController {
  static async signUp(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const userObj = req.body;
      const user = await User.createUser(userObj);
      if (!(user.rowCount === 1)) {
        res.json({
          status: 400,
          error: user,
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
