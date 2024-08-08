import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

router.get('/getUsers', getUsers);

export default router;