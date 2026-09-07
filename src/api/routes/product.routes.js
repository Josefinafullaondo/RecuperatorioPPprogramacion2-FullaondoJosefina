import { Router } from "express";
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProduct, createProduct);
router.put("/", modifyProduct);
router.delete("/:id", validateId, removeProduct);

export default router;
