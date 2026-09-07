import { Router } from "express";
import { destroySession, getAdminUser, loginView } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/", loginView);
router.post("/", getAdminUser);
router.post("/destroy", destroySession);

export default router;
