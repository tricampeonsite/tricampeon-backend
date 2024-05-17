import { Router } from "express";
import { getMatchByID, getMatchesLeagueArgentina, getMatchesLeagues, getMatchesToday } from '../controllers/matches.js'
import getMachesCheerio from "../middlewares/getMachesCheerio.js";
import searchMatch from "../middlewares/searchMatch.js";
import middleware_getChannelByMatch from "../middlewares/middleware_getChannelByMatch.js";
import handleErrors from "../middlewares/handleErrors.js";

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/getMatchesLeagues', getMatchesLeagues )
router.post('/getMatches', [ getMachesCheerio ], getMatchesToday);
router.get('/getMatchByID/:idMatch', [ getMachesCheerio, searchMatch, middleware_getChannelByMatch, handleErrors], getMatchByID)
router.post('/getMatchesLeagueArgentina', getMatchesLeagueArgentina)

export default router;