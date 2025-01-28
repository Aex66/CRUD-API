import pool from "../database";

export interface Order {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
}

/**
 * Crea un nuevo pedido
 * @param userId - ID del usuario que realiza el pedido
 * @param productId - ID del producto comprado
 * @param quantity - Cantidad comprada
 * @returns
 */
export const createOrder = async (userId: number, productId: number, quantity: number): Promise<number> => {
    const query = "INSERT INTO Orders (userId, productId, quantity) VALUES (?, ?, ?)";
    const [result]: any = await pool.query(query, [userId, productId, quantity]);
    return result.insertId; // Devuelve el ID del nuevo pedido
};

/**
 * Obtiene un pedido por ID con detalles del usuario y del producto
 * @param id - ID del pedido
 * @returns Pedido con los detalles del usuario y producto
 */
export const getOrderById = async (id: number): Promise<any | null> => {
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
    const [rows]: any = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
};

/**
 * Lista todos los pedidos realizados por un usuario (LEFT JOIN)
 * @param userId - ID del usuario
 * @returns Lista de pedidos del usuario con detalles del producto
 */
export const getOrdersByUser = async (userId: number): Promise<any[]> => {
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
    const [rows]: any = await pool.query(query, [userId]);
    return rows;
};

/**
 * Elimina un pedido
 * @param id - ID del pedido
 * @returns
 */
export const deleteOrder = async (id: number): Promise<number> => {
    const query = "DELETE FROM Orders WHERE id = ?";
    const [result]: any = await pool.query(query, [id]);
    return result.affectedRows //Devuelve el numero de filas afectadas
};
