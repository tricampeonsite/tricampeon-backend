import { options, optionsApiArgentina } from '../libs/libs.js';
import setDateArg from '../libs/setDateArg.js';

export const getMatchesLeagues = async ( req,res ) => {
    try {
         const { idLeague } = req.body;

         const reqApi = await fetch(`https://api.football-data.org/v4/competitions/${idLeague}/matches?season=2023`, options)
         const resApi = [ await reqApi.json() ];

         if(resApi[0].error == 404) return res.status(404).json({error: resApi[0].message, status: resApi[0].error});
         
         const matches = setDateArg(resApi);
        
         res.status(200).json({matches})
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}


export const getMatchesToday = async (req, res) => {
    try {
        const matches = req.matches;
        res.status(200).json({ matches , status: 200});
    } catch (error) {
        console.log(error);
        if(error) return res.status(500).json({error})
    }
};

export const getMatchesLeagueArgentina = async ( req,res ) => {
    try {
           const connect = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=128&season=2023`, optionsApiArgentina)
           const resApi = [await connect.json()];
           const matches = resApi[0].response.map(item => {

            const localHour = `${item.fixture.date.slice(11,13) - 3}${item.fixture.date.slice(13,16)}` 
            return { ... item, date: item.fixture.date.slice(0,10), hour: localHour }
           })

           res.status(200).json({matches})
    } catch (error) {
        console.log(error);
        res.json({message: error})
    }
}

var dataMatch;

export const getMatchByID = async ( req,res ) => {
    try {
        const match = req.match;

        if(!match) return res.status(404).json({ message: 'No se encontro el evento.', status: 404, match: []});

        dataMatch = await match;
        
        return res.status(200).json({message: 'Evento encontrado.', status: 200, match});
    } catch (error) {
        console.log('Ocurrio un error en getMatchByID. Error: ',error);
        if(error) return res.status(500).json({error})
    }
}


