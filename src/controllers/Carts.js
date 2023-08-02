import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productsAll = new ProductManager
class Carts {
    constructor() {
        this.path = "./src/models/carts.json";
    }
    readCart = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }
    writeCart = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    }
    exist = async (id) => {
        let carts =  await this.readCart();
        return carts.find(cart => cart.id === id)
    }
    addCart =  async () => {
        let oldCarts = await this.readCart();
        let id = nanoid();
        let cartsConcatenado = [{id : id, products : []}, ...oldCarts]
        await this.writeCart(cartsConcatenado);
        return "Carrito Agregado"
    }
    getCartById = async(id) => {
        let cartById = await this.exist(id);
        if(!cartById) return "Carrito no Encontrado";
        return cartById;
    }
    addProductInCart = async (cartId, prodId) => {
        let cartById = await this.exist(cartId);
        if(!cartById) return "Carrito no Encontrado";

        let productById = await productsAll.exist(prodId)
        if(!productById) return "Producto no Encontrado";

        let cartsAll = await this.readCart();
        let cartFilter = cartsAll.filter(cart => cart.id != cartId);
        if(cartById.products.some(prod => prod.id === prodId)) {
            let cartProducts = cartById.products.find(prod => prod.id === prodId)
            cartProducts.cantidad++;
            let cartsConcatenado = [cartById, ...cartFilter]
            await this.writeCart(cartsConcatenado);
            return "Producto agregado al Carrito"
        }
        cartById.products.push({id: productById.id, cantidad: 1})
        let cartsConcatenado = [cartById, ...cartFilter]
        await this.writeCart(cartsConcatenado);
        return "Producto agregado al Carrito"
    }
}
export default Carts;