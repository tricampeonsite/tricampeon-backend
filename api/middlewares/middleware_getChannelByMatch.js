import starPlusEvents from "../libs/starPlusEvents.js";
import Channels from "../models/Channels.js";

export default async ( req,res,next ) => {
    try {
        const typeStream = req.typeStream;
        
        if(typeStream && typeStream === "CHANNEL") return next();
        
        const channelsRecived = req.match[0].channels;
        const match = req.match[0].contestants;

        if(!channelsRecived.length){
            return await Promise.reject({ error: 'Not channels recived!', status: 400, channelsByMatch: [] });
        }

        const namesRecived = channelsRecived.map(channel => channel.name);

        const findChannelsByMatch = await Channels.find({ name: { $in: namesRecived } },{ eventsProgramming: 0, createdAt: 0, updatedAt: 0 })
        
        if(!findChannelsByMatch.length) {
            return await Promise.reject({error: 'Not channels founded!', status: 404, channelsByMatch:[]});
        }

        const starplusURL = await starPlusEvents(channelsRecived, match.homeTeam.name, match.awayTeam.name);

        const setStarPlusURL = findChannelsByMatch.map(match => {
            if(match.name === "star+"){
                match.urlChannel = starplusURL === "#" || starplusURL === "" ? match.urlChannel : [ starplusURL ];
                return match;
            } else {
                return match;
            }
        })

        req.match[0].channels = setStarPlusURL;

        next();

    } catch (error) {
        console.error('Ocurrio un error al obtener los canales del match. Error: ', error);
        next(error)
    }
}
