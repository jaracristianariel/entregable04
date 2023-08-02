import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import __dirname from "../utils.js"

const product = new ProductManager(__dirname + "/src/models/products.json");
const router = Router();

router.get("/", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {allProducts})
})

router.get("/realTimeProducts", async(req, res) => {
    res.render("realTimeProducts")
})
export default router;