import { logoLeagues } from "../logoLeagues.js";
import { options, optionsApiArgentina } from "../libs/libs.js";

export const getScorersByLeagues = async ( req,res ) => {
    try {
        const { code } = req.body;
        const reqApi = await fetch(`https://api.football-data.org/v4/competitions/${code}/scorers`, options)
        const resApi = [ await reqApi.json() ];

        const changeLogos = resApi.map(league => {
            return { ... league, newEmblem: logoLeagues[code]}
        })

        res.status(200).json({changeLogos})
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const getScorersByLeagueArgentina = async ( req,res ) => {
    try {
        const reqApi = await fetch('https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=128&season=2023', optionsApiArgentina);
        const resApi = await reqApi.json();
        res.status(200).json(resApi.response);
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }   
}
