import {Request, Response} from "express";
import { Channel } from "../models/Channel";
import {Message} from "../models/Message";

class MessageController {
  async index (req: Request, res: Response) {
    const { page = 1 } = req.query;
    const limit = 20, offset = (page - 1) * limit;

    const messages = await Message.find(
      {
        where: { channel: req.params.id },
        relations: ['user'],
        take: limit,
        skip: offset
      });

    return res.json(messages);
  }

  async store (req: Request, res: Response) {
    const { content } = req.body;

    const message = new Message();
    message.user = req.user;
    message.channel = await Channel.findOneOrFail(req.params.id);
    message.content = content;
    await message.save();

    return res.json({
      id: message.id,
      content,
      user: {
        id: message.user.id,
        username: message.user.username
      }
    });
  }

}

export default new MessageController();
