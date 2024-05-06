import { Router } from "express";
import { getTeam } from "../controllers/teams.js";

const router = Router();

router.get('/getTeam', getTeam)

export default router;