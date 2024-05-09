import fetch from "node-fetch";
import starPlusEvents from "../libs/starPlusEvents.js";
import Channels from "../models/Channels.js"
import decodeImgURL from "../libs/decodeImgURL.js";

export const createNewChannel = async (req,res) => {
    try {
        const { name, imgChannel, urlChannel, altName } = req.body;

        const newChannel = new Channels({name, urlChannel, imgChannel, altName});

        await newChannel.save();
        res.status(200).json({status:200, message: `New channel "${altName}" created successfully!`})
    } catch (error) {
        console.error('Ocurrio un error en createNewChannel controller. Error: ', error);
        res.status(500).json({error, status: 500});
    }
}

export const getAllChannels = async ( req,res ) => {
    try {
        const findChannels = await Channels.find({},{name: 0, eventsProgramming: 0, createdAt: 0, updatedAt: 0 });
        if(!findChannels) return res.status(404).json({error: 'Channels not founded!', status: 404});

        res.status(200).json({channels: findChannels, status: 200});
    } catch (error) {
        console.error('Ocurrio un error en el controlador getAllChannels. Error: ', error)
        res.status(500).json({error, status: 500});
    }
}

export const getChannelSchedule = async (req,res) => {
    try {
        const requestDataVix = await fetch(process.env.URL_VIX_EVENTS);
        const requestDataStarPlus = await fetch(process.env.URL_STARPLUS_EVENTS);

        const responseDataVix = await requestDataVix.json();
        let responseDataStarPlus = await requestDataStarPlus.json();

        if(!responseDataVix) return res.status(404).json({status: 404, message: 'Not found Vix events!'});
        if(!responseDataStarPlus) return res.status(404).json({status: 404, message: 'Not found Star+ events!'});


        if(responseDataStarPlus){
            responseDataStarPlus.forEach((match, index) => {
                match.img = decodeImgURL(match).img;
                match.url = decodeImgURL(match).url;
                match._id = index
                
                return {... match};
            })
        }
        const channelSchedule = [responseDataStarPlus, responseDataVix];

        return res.status(200).json({status: 200, schedule: channelSchedule});

    } catch (error) {
        console.error('Ocurrio un error en el controlador getChannelScheduled. Error: ', error)
        res.status(500).json({error, status: 500});
    }
}

export const getChannelByID = async ( req,res ) => {
    try {
        const { idChannel } = req.params;
        if(!idChannel) return res.status(400).json({ message: 'Falta parametro "idChannel', status: 400 });
        const findChannel = await Channels.findById(idChannel);

        if(!findChannel) return res.status(404).json({ message: 'Channel not found.', status: 404 });

        return res.status(200).json({ channel: [findChannel], status: 200 });
    } catch (error) {
        console.error('Ocurrio un error en el controlador getChannelByID. Error: ', error)
        res.status(500).json({error, status: 500});
    }
}