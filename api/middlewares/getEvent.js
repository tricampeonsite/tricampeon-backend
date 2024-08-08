import mongoose from "mongoose";
import Channels from "../models/Channels.js";

export default async (req,res,next) => {
    try {
        const op = Number(req.query.op);
        const idChannel = new mongoose.Types.ObjectId(req.params.idChannel);
        
        const channelFounded = await Channels.findById(idChannel);
        
        if(!channelFounded) return new Promise.reject({ error: 'No se encontro el canal!', status: 404 });

        let event = channelFounded.urlChannel[op]

        req.event = event;

        next()
    } catch (error) {
        console.error('Ocurrio un error en middleware getEvent. Error: ', error);
        next(error)
    }
}