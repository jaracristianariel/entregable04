import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }
    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product, null, 2));
    }
    exist = async (id) => {
        let products =  await this.readProducts();
        return products.find(prod => prod.id === id)
    }
    addProducts = async (product) => {
        let oldProducts = await this.readProducts();
        product.id = nanoid();
        let allProducts = [...oldProducts, product];
        await this.writeProducts(allProducts, null, 2);
        return "Producto Agregado";
    }
    getProducts = async() => {
        return await this.readProducts();
    }
    getProductsById = async(id) => {
        let prodById = await this.exist(id);
        if(!prodById) return "Producto no Encontrado";
        return prodById;
    }
    updateProducts = async(id, product) => {
        let prodById = await this.exist(id);
        if(!prodById) return "Producto no Encontrado";
        await this.deleteProducts(id);
        let oldProducts = await this.readProducts();
        let products = [{...product, id : id}, ...oldProducts]
        await this.writeProducts(products, null, 2);
        return "Producto Actualizado";
    }
    deleteProducts = async (id) => {
        let products = await this.readProducts({});
        let prodExiste = products.some(prod => prod.id === id)
        if (prodExiste) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts, null, 2)
            return "Producto Eliminado"
        }
        return "El producto que desea eliminar no existe"        
    }
}
export default ProductManager;


