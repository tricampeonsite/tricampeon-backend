import { Router } from "express";
import { test_proxy } from "../controllers/proxy.controllers.js";

const routes = Router();

routes.get("/", test_proxy)


export default routes;