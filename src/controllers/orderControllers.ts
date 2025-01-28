import { Request, Response } from "express";
import { createOrder, deleteOrderById, getOrderById, getOrdersByUser } from "../models/Order";
  
//Crea un nuevo pedido
export const createOrderController = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    try {
        const orderId = await createOrder(userId, productId, Number(quantity))
        res.status(201).json({ id: orderId, userId, productId, quantity: Number(quantity)});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el pedido" });
    }
};

//Obtiene un pedido por su ID
export const getOrderByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await getOrderById(Number(id))
        if (!order) {
            res.status(404).json({ message: "Pedido no encontrado" });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el pedido" });
    }
};

//Obtiene la lista de pedidos de un usuario
export const getUserOrdersController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const orders = getOrdersByUser(Number(id))

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los pedidos de este usuario" });
    }
};

//Elimina un pedido
export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const rowsAffected = await deleteOrderById(Number(id))

        if (rowsAffected){
            res.status(200).json({ message: 'El pedido ha sido eliminado con exito'});
            return;
        }

        res.status(404).json({ message: 'Pedido no encontrado'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al intentar borrar este pedido" });
    }
};