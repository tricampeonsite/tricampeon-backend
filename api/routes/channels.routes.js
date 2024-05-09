import { Router } from "express";
import { createNewChannel, getAllChannels, getChannelByID, getChannelSchedule } from "../controllers/channels.controllers.js";

const router = Router();

router.post('/createNewChannel', createNewChannel);
router.get('/getAllChannels', getAllChannels);
router.get('/getChannelSchedule', getChannelSchedule);
router.get('/getChannelByID/:idChannel', getChannelByID);

export default router;