import { Request, Response } from "express";
import { User } from '../models/User'

class UserController {
  async index(req: Request, res: Response) {
    const users = await User.find();

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();

    return res.json(user);
  }
}

export default new UserController();
