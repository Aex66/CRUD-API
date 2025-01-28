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
exports.deleteOrderById = exports.getOrdersByUser = exports.getOrderById = exports.createOrder = void 0;
const database_1 = __importDefault(require("../database"));
/**
 * Crea un nuevo pedido
 * @param userId - ID del usuario que realiza el pedido
 * @param productId - ID del producto comprado
 * @param quantity - Cantidad comprada
 * @returns
 */
const createOrder = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO Orders (userId, productId, quantity) VALUES (?, ?, ?)";
    const [result] = yield database_1.default.query(query, [userId, productId, quantity]);
    return result.insertId; // Devuelve el ID del nuevo pedido
});
exports.createOrder = createOrder;
/**
 * Obtiene un pedido por ID con detalles del usuario y del producto
 * @param id - ID del pedido
 * @returns Pedido con los detalles del usuario y producto
 */
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT 
            Orders.id AS orderId,
            Orders.quantity,
            Orders.createdAt AS orderCreatedAt,
            Users.id AS userId,
            Users.name AS userName,
            Users.email AS userEmail,
            Products.id AS productId,
            Products.name AS productName,
            Products.price AS productPrice
        FROM Orders
        INNER JOIN Users ON Orders.userId = Users.id
        INNER JOIN Products ON Orders.productId = Products.id
        WHERE Orders.id = ?
    `;
    const [rows] = yield database_1.default.query(query, [id]);
    return rows.length ? rows[0] : null;
});
exports.getOrderById = getOrderById;
/**
 * Lista todos los pedidos realizados por un usuario (LEFT JOIN)
 * @param userId - ID del usuario
 * @returns Lista de pedidos del usuario con detalles del producto
 */
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        SELECT 
            Orders.id AS orderId,
            Orders.quantity,
            Orders.createdAt AS orderCreatedAt,
            Products.id AS productId,
            Products.name AS productName,
            Products.price AS productPrice
        FROM Orders
        LEFT JOIN Products ON Orders.productId = Products.id
        WHERE Orders.userId = ?
    `;
    const [rows] = yield database_1.default.query(query, [userId]);
    return rows;
});
exports.getOrdersByUser = getOrdersByUser;
/**
 * Elimina un pedido
 * @param id - ID del pedido
 * @returns
 */
const deleteOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM Orders WHERE id = ?";
    const [result] = yield database_1.default.query(query, [id]);
    return result.affectedRows; //Devuelve el numero de filas afectadas
});
exports.deleteOrderById = deleteOrderById;
