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
exports.deleteOrder = exports.getUserOrders = exports.getOrderByIdController = exports.createOrderController = void 0;
const Order_1 = require("../models/Order");
//Crea un nuevo pedido
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        const orderId = yield (0, Order_1.createOrder)(userId, productId, Number(quantity));
        res.status(201).json({ id: orderId, userId, productId, quantity: Number(quantity) });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el pedido" });
    }
});
exports.createOrderController = createOrderController;
//Obtiene un pedido por su ID
const getOrderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield (0, Order_1.getOrderById)(Number(id));
        if (!order) {
            res.status(404).json({ message: "Pedido no encontrado" });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el pedido" });
    }
});
exports.getOrderByIdController = getOrderByIdController;
//Obtiene la lista de pedidos de un usuario
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = (0, Order_1.getOrdersByUser)(Number(id));
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los pedidos de este usuario" });
    }
});
exports.getUserOrders = getUserOrders;
//Elimina un pedido
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rowsAffected = yield (0, Order_1.deleteOrderById)(Number(id));
        if (rowsAffected) {
            res.status(200).json({ message: 'El pedido ha sido eliminado con exito' });
            return;
        }
        res.status(404).json({ message: 'Pedido no encontrado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al intentar borrar este pedido" });
    }
});
exports.deleteOrder = deleteOrder;
