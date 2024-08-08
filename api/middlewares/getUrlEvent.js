import extractSource_scrapping from "../libs/extractSource_scrapping.js";
import parameters from "../libs/parameters.js";
import trySOURCE from "../libs/sources.js";
import streamingServers from "../libs/streamingServers.js";
import listChannels_scrapped from "../libs/listChannels_scrapped.js";

export default async (req, res, next) => {
    try {
        let sources;
        let server;
        let urlStream;
        const typeStream = req.typeStream;
        const { idChannel, op } = req.query;

        if (typeStream) {
            if (typeStream === "CHANNEL") {
                urlStream = req.event;
            }
            if (typeStream === "MATCH") {
                const availableChannelList = req.match[0].channels;
                const channelSelected = availableChannelList.find(channel => channel._id == idChannel);
                urlStream = channelSelected.urlChannel[op];
            }
        }

        const isUrlScrapped = listChannels_scrapped.some(nameChannel => new RegExp(`\\b${nameChannel}\\b`).test(urlStream));

        if(isUrlScrapped) {
            const replaceUrlStream = await extractSource_scrapping(urlStream);
            urlStream = replaceUrlStream;
        }

        const { key, keyId, getIMG, getTitle } = parameters(urlStream);
        const listServers = streamingServers(urlStream, server);
        const randomIndex = Math.floor(Math.random() * listServers.length + 1);

        trySOURCE(urlStream, sources, listServers, randomIndex,
            function (validSOURCE) {
                req.videoData = {
                    url: validSOURCE,
                    title: getTitle,
                    img: getIMG,
                    key,
                    keyId
                }
                next()
            },
            function (err) {
                console.error('No se encontro el servidor. Error: ', err);
                req.status = { status: 500, error: 'No se encontro servidor para esta transmisión.', message: err }
                next()
            })

    } catch (error) {
        console.error('Ocurrio un error en getURLevent. Error: ', error);
        next(error);
    }
}