import { Router } from "express";
import { createNewChannel, getAllChannels, getChannelByID, getChannelSchedule, sendVideo, testDecodeURL } from "../controllers/channels.controllers.js";
import getEvent from "../middlewares/getEvent.js";
import getUrlEvent from "../middlewares/getUrlEvent.js";
import helmet from "helmet";
import matchOrChannel from "../middlewares/matchOrChannel.js";
import getMachesCheerio from "../middlewares/getMachesCheerio.js";
import searchMatch from "../middlewares/searchMatch.js";
import middleware_getChannelByMatch from "../middlewares/middleware_getChannelByMatch.js";
import handleErrors from "../middlewares/handleErrors.js";
const router = Router();

router.post('/createNewChannel', helmet(), createNewChannel);
router.get('/getAllChannels', helmet(), getAllChannels);
router.get('/getChannelSchedule', helmet(), getChannelSchedule);
router.get('/getChannelByID/:idChannel', helmet(), getChannelByID);
router.get('/getStream/:idEvent',
    [
        matchOrChannel,
        getMachesCheerio,
        searchMatch,
        middleware_getChannelByMatch,
        getUrlEvent,
        handleErrors
    ],
    sendVideo);
router.get('/testDecodeURL', helmet(), testDecodeURL);

export default router;