import { options } from '../libs/libs.js';
import setDateArg from '../libs/setDateArg.js';

// Objeto para almacenar en caché las respuestas de las peticiones
const cache = {};

// Tiempo de vida (TTL) para los datos en caché (en milisegundos)
const CACHE_TTL = 600000; // 1 minuto

// obtener horario argentino
const utcDate = new Date(); // Obtiene la fecha y hora actual en UTC
const argentinaDate = new Date(utcDate.getTime() - (3 * 60 * 60 * 1000)); // Ajusta la fecha y hora para Argentina (UTC-3)
const argentinaDateString = argentinaDate.toISOString().slice(0, 10); 

export default async (req,res,next) => {
    try {
        const { idLeague } = req.body;

        if (cache[idLeague] && cache[idLeague].timestamp + CACHE_TTL > Date.now()) {
            const cachedResponse = cache[idLeague].data;
            req.filterMatchesToday = cachedResponse;
            return next();
        }

        const connect = await fetch(`https://api.football-data.org/v4/competitions/${idLeague}/matches`, options);
        const resApi = [ await connect.json() ];
        
        const dateArg = setDateArg(resApi);

        const filterMatchesToday = dateArg.filter(match => {
            if (match.date == argentinaDateString) {
                return match;
            }
        });

        cache[idLeague] = {
            data: filterMatchesToday,
            timestamp: Date.now()
        };

        req.filterMatchesToday = filterMatchesToday;
        next()
    } catch (error) {
        console.error('Ocurrio un error en middleware searchMatchesToday. Error: ', error);
        res.status(500).json({error});
    }
}
