import { Router } from "express";
import { createNewChannel, getAllChannels, getChannelSchedule, getChannelsByMatch } from "../controllers/channels.controllers.js";

const router = Router();

router.post('/createNewChannel', createNewChannel);
router.get('/getAllChannels', getAllChannels);
router.post('/getChannelsByMatch', getChannelsByMatch);
router.get('/getChannelSchedule', getChannelSchedule);

export default router;