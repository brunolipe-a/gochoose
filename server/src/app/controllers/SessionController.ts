import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/User'

class SessionController {
  async store(req: Request, res: Response) {
    let { email, username, password } = req.body;
    const user = await User.findOne({ where: [{ email }, { username }] });

    if(!user) {
      return res.status(401).json({ message: "Usuario não existe" });
    }

    if (!(await user.checkpassword(password))) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const { id } = user;
    username = username ?? user.username;
    email = email ?? user.email;

    return res.json({
      user: {
        id,
        email,
        username
      },
      token: jwt.sign(
        { id },
        process.env.APP_SECRET || "gochoose",
        {
          expiresIn: '7d'
        }
      )
    });
  }
}

export default new SessionController();
