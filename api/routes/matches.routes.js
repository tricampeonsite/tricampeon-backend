import { Router } from "express";
import { getMatchesLeagueArgentina, getMatchesLeagues, getMatchesToday } from '../controllers/matches.js'
import getMachesCheerio from "../middlewares/getMachesCheerio.js";

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/getMatchesLeagues', getMatchesLeagues )
router.post('/getMatches', [ getMachesCheerio ], getMatchesToday)
router.post('/getMatchesLeagueArgentina', getMatchesLeagueArgentina)

export default router;