import { Router } from "express";
import { getLeaguesByID } from "../controllers/leagues.js";
const router = Router();


router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/getLeaguesByID', getLeaguesByID)

export default router;