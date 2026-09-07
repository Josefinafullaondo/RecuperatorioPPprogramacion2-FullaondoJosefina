import { Router } from "express";
import { validateId, validateSale } from "../middlewares/middlewares.js";
import { createSale, getAllSales, getSaleById } from "../controllers/sale.controllers.js";

const router = Router();

router.get("/", getAllSales);
router.get("/:id", validateId, getSaleById);
router.post("/", validateSale, createSale);

export default router;
