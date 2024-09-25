import { Router } from "express";
import TokenController from "../app/controllers/TokenController";

const router = new Router();

router.post('/', TokenController.store);

export default router;