import { load } from 'cheerio';
import axios from 'axios';
import setMatchStatus from '../libs/setMatchStatus.js';


/*
 La web canchallena.lanacion, utiliza redux toolkit para gestionar los estados.
 1- Se envia una solicitud GET a la url obteniendo el html, luego se selecciona el script que contiene los datos de los eventos
 2- Se recorta el script obteniendo "matchesByCompetition"
 3- Se parsea el script a JSON.
 4- sobreescribir la propiedad channels: { name, altName }, y setear matchStatus
 5- pasar datos por req.matches
*/

const cache = {
    withDateMatch: {
        data: null,
        dateMatch: null,
        timestamp: 0
    },
    withoutDateMatch: {
        data: null,
        timestamp: 0
    }
};

const CACHE_TTL = 600000; // Tiempo en ms de guardado en la memoria caché

// Limpiar el caché cada 60 segundos
setInterval(() => {
    const currentTime = Date.now();
    Object.keys(cache).forEach(cacheKey => {
        const cachedData = cache[cacheKey];
        if (cachedData.timestamp + CACHE_TTL < currentTime) {
            cache[cacheKey] = cacheKey === 'withDateMatch' ? { data: null, dateMatch: null, timestamp: 0 } : { data: null, timestamp: 0 };
        }
    });
}, CACHE_TTL);

export default async (req, res, next) => {
    try {
        const { dateMatch } = req.body;
        const cacheKey = dateMatch ? 'withDateMatch' : 'withoutDateMatch';
        const cachedData = cache[cacheKey];

        const currentTime = Date.now();
        if (cachedData.data && (!dateMatch || (cachedData.dateMatch === dateMatch && (cachedData.timestamp + CACHE_TTL > currentTime)))) {
            req.matches = cachedData.data;
            return next();
        }

       try {
        // convertir el el script texto a JSON.
        const parseDataHomeReducer = JSON.parse(`{${await getHomeReducer(dateMatch)}}`);
        const dataMatchesByCompetition = parseDataHomeReducer.matchesByCompetition;

        if (!dataMatchesByCompetition.length) {
            return next({ error: 'No matches found', status: 404 });
        }

        cache[cacheKey] = { data: dataMatchesByCompetition, dateMatch: dateMatch || null, timestamp: Date.now() };
        
        req.matches = rewriteChannelsByMatches(dataMatchesByCompetition);;
        next()
    } catch (error) {
        console.error('Ocurrio un error al convertir los datos de texto a JSON en parseDataHomeReducer. Error: ', error);
        next(error)
    }

    } catch (error) {
        console.error(error);
        next(error);
    }
};
                    

// obtener datos de los partidos en formato text.
const getHomeReducer = async (dateMatch) => {                                           // esta url va sin fecha. El formato de fecha es 2024-04-30
    const url = dateMatch ? `https://canchallena.lanacion.com.ar/fecha/${dateMatch}` : 'https://canchallena.lanacion.com.ar/';

    try {
        const response = await axios.get(url);
        const $ = load(response.data);

        const scriptsContent = [];

        $('script').each((index, element) => {
            const scriptText = $(element).html();
            if (scriptText.includes('homeReducer')) {
                scriptsContent.push(scriptText.trim());
            }
        });

        let getIndexStartHomeReducer; 
        let getIndexEndHomeReducer;

        for (let i = 0; i < scriptsContent.length; i++) {
            const element = scriptsContent[i];
            getIndexStartHomeReducer = element.indexOf('"matchesByCompetition"');
            getIndexEndHomeReducer = element.indexOf(',"timeUntilNextMatch"');
        }

        const homeReducer = scriptsContent.length > 0 ? scriptsContent[0].slice(getIndexStartHomeReducer, getIndexEndHomeReducer) : null;

        return homeReducer;
    } catch (error) {
        console.error('Error al hacer fetching en getHomeReducer! Error: ', error.code);
        return null;
    }
}


const rewriteChannelsByMatches = (matches) => {
    return matches.map(obj => {
        obj.matches.forEach(match => {
            const rewriteLocalTime = match.localTime.trim().replace(/\s*hs\s*/g, '').replace(/\s/g, '').toLowerCase();
            match.matchStatus = setMatchStatus(match.matchDateText ,rewriteLocalTime, match.matchStatus); 
            match.tournamentId = obj.competition.tournamentId;
            match.competitionName = obj.competition.competitionName;
            if(match.channels){
                match.channels = match.channels.map(channel => {
                    return {
                        name: channel.trim().replace(/\s/g, '').toLowerCase(),
                        altName: channel
                    };
                });
            }
        });
        return obj;
    });
}


