import express from "express";
import router from "./router/view.routes.js";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js"
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import {Server} from "socket.io";


const app = express();
const PORT = 8000;
const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

//static
app.use("/", express.static(__dirname + "/public"));


app.use("/api/", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/", router)



const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);
});
const socketServer = new Server(httpServer);


const pManagerSocket = new ProductManager(__dirname + "/src/models/products.json")

socketServer.on("connection", async(socket) => {
    console.log("client connected con Id:", socket.id);
    let allProducts = await product.getProducts({});
    socketServer.emit("products", allProducts)

    socket.on("addProducts", async(obj) => {
        await pManagerSocket.addProducts(obj)
        let allProducts = await product.getProducts({});
        socketServer.emit("products", allProducts)
    })

    socket.on("deleteProducs", async(id) => {
        console.log(id);
        await pManagerSocket.deleteProducts(id)
        let allProducts = await product.getProducts({});
        socketServer.emit("products", allProducts)
    })

})