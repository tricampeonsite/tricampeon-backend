import { options, optionsApiArgentina } from "../libs/libs.js";

export const getTeamArgentina = async ( req,res ) => {
 try {
    const reqApi = await fetch('https://api-football-v1.p.rapidapi.com/v3/teams?id=455', optionsApiArgentina)
    const resApi = await reqApi.json();
    res.status(200).json(resApi);
 } catch (error) {
    console.log(error);
    res.status(400).json({error})
 }
}

export const getTeam = async ( req,res ) => {
    try {
        const reqApi = await fetch('http://api.football-data.org/v4/teams/102', options)
        const resApi = await reqApi.json();
        res.status(200).json(resApi);
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}