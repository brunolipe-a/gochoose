import { Request, Response } from "express";
import { Group } from '../models/Group'
import {User} from "../models/User";
import {Channel} from "../models/Channel";

class GroupController {
  async index(req: Request, res: Response) {
    const groups = await Group.find();

    return res.json(groups);
  }

  async store(req: Request, res: Response) {
    const { name, description, is_private } = req.body;
    const master = req.user;

    const channel = new Channel();
    channel.name = "geral";
    await channel.save();

    const group = new Group();
    group.name = name;
    group.description = description;
    group.is_private = is_private || false;
    group.master = master;
    group.channels = [channel];
    group.players = [master];
    await group.save();

    const newGroup = await Group.findOne(group.id, { relations: ['players', 'master', 'channels'] });
    return res.json(newGroup);
  }

  async delete(req: Request, res: Response) {
    // const { ong } = req;
    // const { id } = req.params;
    // const incident = await Group.findOne(id, { relations: ['ong'] });
    //
    // if (!incident) {
    //   return res.status(404).json({ error: "Incidente não encontrado" });
    // }
    //
    // if (incident?.ong.id !== ong.id) {
    //   return res.status(401).json({ error: "Você não tem autorização para executar delete nesse incidente" });
    // }
    //
    // await Group.delete(incident.id);
    //
    // return res.json({ message: "Incidente deletado com sucesso!" });
  }
}

export default new GroupController();
