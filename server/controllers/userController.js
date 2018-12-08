import User from '../models/userModel';

export default class UserController {
  static async signUp(req, res) {
    const userObj = req.body;
    const user = await User.createUser(userObj);
    res.json(user);
  }
}
