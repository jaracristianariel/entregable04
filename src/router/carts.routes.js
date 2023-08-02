import { Router } from "express";
import Carts from "../controllers/Carts.js";

const CartsRouter = Router();
const carts = new Carts

CartsRouter.post("/", async (req, res) => {
    res.send(await carts.addCart())
})
CartsRouter.get("/", async(req, res) =>{
    res.send(await carts.readCart())
})
CartsRouter.get("/:id", async(req, res) =>{
    res.send(await carts.getCartById(req.params.id))
})
CartsRouter.post("/:cid/products/:pid", async(req, res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await carts.addProductInCart(cartId, prodId))
})

export default CartsRouter;