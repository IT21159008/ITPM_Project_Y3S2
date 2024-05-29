import express from "express";

import {
  addProduct,
  getAllItems,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/advertising.controller.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/addAdvertising", addProduct);
router.put("/updateAdvertising/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
