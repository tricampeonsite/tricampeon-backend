import { Router } from "express";
import { getScorersByLeagueArgentina, getScorersByLeagues } from "../controllers/scorers.js";

const router = Router();

router.post('/getScorersByLeagues', getScorersByLeagues);
router.post('/getScorersByLeagueArgentina', getScorersByLeagueArgentina )

export default router;