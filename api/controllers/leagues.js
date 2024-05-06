import { config } from "dotenv"
config()

export const getLeaguesByID = async ( req,res ) => {
    try {
        const { idLeague } = req.body;
        const connect = await fetch(`https://api.unidadeditorial.es/sports/v1/classifications/current/?site=8&type=10&tournament=0${idLeague}`)
        const resApi = await connect.json();
        if(!resApi) return res.status(404).json({error: 'Not found League', status: 404});
        
        res.status(200).json({resApi, status: 200}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 500, error });
    }
}