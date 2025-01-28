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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getProductById = exports.createProduct = void 0;
const database_1 = __importDefault(require("../database"));
/**
 * Crea un nuevo producto
 * @param name - Nombre del producto
 * @param price - Precio del producto
 * @param createdBy - ID del usuario que creó el producto
 * @returns
 */
const createProduct = (name, price, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.default.query("INSERT INTO Products (name, price, createdBy) VALUES (?, ?, ?)", [name, price, createdBy]);
    return result.insertId; // devuelve el ID del nuevo producto
});
exports.createProduct = createProduct;
/**
 * Obtiene un producto por ID con detalles del usuario que lo creó
 * @param id - ID del producto
 * @returns
 */
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT 
            Products.id AS productId,
            Products.name AS productName,
            Products.price,
            Products.createdAt AS productCreatedAt,
            Users.id AS userId,
            Users.name AS userName,
            Users.email AS userEmail,
            Users.createdAt AS userCreatedAt
        FROM Products
        INNER JOIN Users ON Products.createdBy = Users.id
        WHERE Products.id = ?
    `;
    const [rows] = yield database_1.default.query(query, [id]);
    return rows.length ? rows[0] : null;
});
exports.getProductById = getProductById;
/**
 * Obtiene todos los productos, con un parametro opcional para filtrarlos.
 * @returns
 */
const getAllProducts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "SELECT * FROM Products";
    const queryParams = [];
    //Se añaden filtros dinamicamente
    if (filters && (filters.price || filters.name)) {
        const conditions = [];
        if (filters.price) {
            //Filtra productos con un precio menor o igual al filtro
            conditions.push("price <= ?");
            queryParams.push(filters.price);
        }
        if (filters.name) {
            //Filtra productos con un nombre parecido al filtro.
            conditions.push("name LIKE ?");
            queryParams.push(`%${filters.name}%`);
        }
        query += ` WHERE ${conditions.join(" AND ")}`;
    }
    const [rows] = yield database_1.default.query(query, queryParams);
    return rows;
});
exports.getAllProducts = getAllProducts;
