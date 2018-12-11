import ExpressValidator from 'express-validator/check';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { generateToken } from '../helpers/authToken';
import errorHandler from '../helpers/errorhandler';

const { validationResult } = ExpressValidator;

export default class UserController {
  /**
   * @description - Sign up a new user account
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */
  static async signUp(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const userObj = req.body;
      userObj.password = bcrypt.hashSync(userObj.password, 10);
      userObj.registered = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const user = await User.createUser(userObj);
      if (!(user.rowCount === 1)) {
        // 'user' is an error here.
        const error = user;
        res.json({
          status: 400,
          error: errorHandler.find(err => err.code === error.code).message,
        });
      } else {
        const jwtData = {
          username: user.rows[0].username,
          email: user.rows[0].email,
          id: user.rows[0].id,
          isadmin: user.rows[0].isadmin,
        };

        const token = generateToken(jwtData);
        res.json({
          status: 200,
          data: [
            {
              token,
              user: jwtData,
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

  /**
   * @description - Sign in a user account
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof RecordsController
   *
   * @returns {object} Class instance
   */
  static async signIn(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const { username, password } = req.body;
      const user = await User.findOneByUsername(username);
      if (!(user.rowCount === 1)) {
        // 'user' is an error here.
        res.json({
          status: 400,
          error: 'You do not have an active account, please signup.',
        });
      } else {
        const passwordisValid = bcrypt.compareSync(password, user.rows[0].password);
        if (passwordisValid) {
          const jwtData = {
            username: user.rows[0].username,
            email: user.rows[0].email,
            id: user.rows[0].id,
            isadmin: user.rows[0].isadmin,
          };
          const token = generateToken(jwtData);
          res.json({
            status: 200,
            data: [
              {
                token,
                user: jwtData,
              },
            ],
          });
        } else {
          res.json({
            status: 400,
            error: 'Password is invalid.',
          });
        }
      }
    } else {
      res.json({
        status: 400,
        error: errors,
      });
    }
  }
}
