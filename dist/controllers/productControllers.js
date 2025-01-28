"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsController = exports.getProductByIdController = exports.createProductController = void 0;
const Product_1 = require("../models/Product");
//Crea un nuevo producto
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, createdBy } = req.body;
    try {
        if (isNaN(price)) {
            res.status(422).json({ message: 'Precio invalido' });
            return;
        }
        const productId = yield (0, Product_1.createProduct)(name, price, createdBy);
        res.status(201).json({ id: productId, name, price, createdBy });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
});
exports.createProductController = createProductController;
//Obtiene un producto por su ID
const getProductByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield (0, Product_1.getProductById)(Number(id));
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
});
exports.getProductByIdController = getProductByIdController;
//Obtiene la lista de productos con opcion de filtrarlos
const getAllProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, name } = req.query;
        if (price || name) {
            const products = yield (0, Product_1.getAllProducts)({ price: Number(price), name: name });
            res.status(200).json(products);
            return;
        }
        const products = yield (0, Product_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al listar los productos" });
    }
});
exports.getAllProductsController = getAllProductsController;
