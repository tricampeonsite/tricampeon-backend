import { Router } from "express";
import { checkBet, getBets, sendBet } from "../controllers/bets.controller.js";

const router = Router();

router.post('/sendBet',  sendBet);
router.post('/checkBet', checkBet)
router.get('/getBets', getBets);

export default router;