import mongoose from "mongoose";
import Channels from "../models/Channels.js";

export default async (req, res, next) => {
  try {
    const idEvent = req.params.idEvent;
    const idChannel = req.params.idChannel;
    const op = Number(req.query.op);
    const typeStream = ["MATCH", "CHANNEL"];

    try {
      if (new mongoose.Types.ObjectId(idEvent)){
        const foundChannel = await Channels.findById(new mongoose.Types.ObjectId(idEvent));
        if (!foundChannel) return await Promise.reject({ error: 'Channel not found!', status: 404 });
        req.event = foundChannel.urlChannel[op];
        req.typeStream = typeStream[1]  // CHANNEL
        next()
        return;
      }
    } catch (error) {
      req.params.idMatch = idEvent;
      req.typeStream = typeStream[0]; // MATCH
      next()
    }
  } catch (error) {
    console.error('Ocurrio un error en getMatchStream. Error: ', error);
    next(error)
  }
}