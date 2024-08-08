import Bets from "../models/Bets.js";
import User from "../models/User.js";

export const sendBet = async ( req,res ) => {
    try {
        const { match,user,winner,status } = req.body;

        const newBet = new Bets({
            match,
            user,
            winner,
            status
        })
        const foundBet = await Bets.find({match})
       
        if(foundBet){
            const getFoundBets = foundBet.map(users => users.user[0].username);
            if(getFoundBets.includes(user[0].username)){
                return res.status(203).json({ message: 'El usuario ya realizo esta apuesta!', status:203 });
            }
        } 

        await newBet.save();
        res.status(200).json({message: 'Se guardo la apuesta en BDD', status:200});
    } catch (error) {
        console.log(error);
        res.status(400).json({error,status:400});
    }
}

export const getBets = async ( req,res ) => {
    try {
        const bets = await Bets.find();
        res.status(200).json(bets);
    } catch (error) {
        res.status(400).json({error});
    }
}


export const checkBet = async ( req,res ) => {

        try {
          const { idBet } = req.body.idBet;
          const { dataMatchUpdated } = req.body;
      
          const foundBetRequest = await Bets.findOne({ _id: idBet });
      
          if (!foundBetRequest) return res.status(404).json({ message: 'Bet not found' });
          if (foundBetRequest.checked == true) return res.status(203).json({ message: 'La apuesta ya ha sido checkeada!' });
      
          const verificationResult = await verifyBetPoints(foundBetRequest, dataMatchUpdated);
          foundBetRequest.save();
      
          res.status(200).json({ message: 'ok', verificationResult });
        } catch (error) {
          res.status(400).json({ message: error });
        }
}

const verifyBetPoints = async ( idBet,dataMatchUpdated ) => {
    try {
        const foundBetRequest_BDD = await Bets.findOne({_id: idBet}) //  base de datos 
        const idUser = foundBetRequest_BDD.user[0]._id; //
        const foundUserToBet_BDD = await User.findOne({_id: idUser});  // base de datos

        const foundBetRequest_winner_BDD = foundBetRequest_BDD.winner; // base de datos
        foundBetRequest_BDD.checked = true; // base de datos
        foundBetRequest_BDD.status = 'FINALIZED' // base de datos

        if(!foundUserToBet_BDD) return 'User not found';

        // dataMatchUpdated es es el match actualizado que proviene de la api.
        // foundBetRequest_BDD es el match guardado en BDD, esta desactualizado.

        if(foundBetRequest_BDD.match[0].id){
            const winner =
               dataMatchUpdated[0].score.winner === 'AWAY_TEAM'
                 ? 'AWAY_TEAM'
                 : dataMatchUpdated[0].score.winner === 'HOME_TEAM'
                 ? 'HOME_TEAM'
                 : dataMatchUpdated[0].score.winner === 'DRAW'
                 ? 'DRAW'
                 : '';
       
             
             if (foundBetRequest_winner_BDD === winner) {
               foundBetRequest_BDD.betHit = true;
               
               foundUserToBet_BDD.points
               ? foundUserToBet_BDD.points = foundUserToBet_BDD.points + 5
               : foundUserToBet_BDD.points = 5;
             } else {
                foundBetRequest_BDD.betHit = false;
                foundUserToBet_BDD.points = foundUserToBet_BDD.points;
             }

        } else if(foundBetRequest_BDD.match[0].fixture.id){
            const winner =
             dataMatchUpdated[0].goals.home > dataMatchUpdated[0].goals.away
               ? 'HOME_TEAM'
               : dataMatchUpdated[0].goals.home < dataMatchUpdated[0].goals.away
               ? 'AWAY_TEAM'
               : dataMatchUpdated[0].goals.home === dataMatchUpdated[0].goals.away
               ? 'DRAW'
               : '';
             
               if (dataMatchUpdated[0].goals === null) return 'Por jugar.';
             if (foundBetRequest_winner_BDD === winner) { 
                foundBetRequest_BDD.betHit = true;

                foundUserToBet_BDD.points
                ? foundUserToBet_BDD.points = foundUserToBet_BDD.points + 5
                : foundUserToBet_BDD.points = 5;
              } else {
                foundBetRequest_BDD.betHit = false;
                 foundUserToBet_BDD.points = foundUserToBet_BDD.points;
              }
        }

        foundUserToBet_BDD.save();
        foundBetRequest_BDD.save();

        return {foundUserToBet_BDD,foundBetRequest_BDD}
    } catch (error) {
        console.log(error);
    }
}

