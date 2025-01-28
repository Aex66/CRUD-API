import pool from "../database";

export interface Product {
    id: number;
    name: string;
    price: number;
    createdBy: number;
    createdAt: number;
}

/**
 * Crea un nuevo producto
 * @param name - Nombre del producto
 * @param price - Precio del producto
 * @param createdBy - ID del usuario que creó el producto
 * @returns
 */
export const createProduct = async (name: string, price: number, createdBy: number): Promise<number> => {
    const [result]: any = await pool.query("INSERT INTO Products (name, price, createdBy) VALUES (?, ?, ?)", [name, price, createdBy]);
    return result.insertId; // devuelve el ID del nuevo producto
};

/**
 * Obtiene un producto por ID con detalles del usuario que lo creó
 * @param id - ID del producto
 * @returns
 */
export const getProductById = async (id: number): Promise<any | null> => {
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

    const [rows]: any = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
};

export interface ProductFilters {
    price?: number;
    name?: string;
}
/**
 * Obtiene todos los productos, con un parametro opcional para filtrarlos.
 * @returns 
 */
export const getAllProducts = async (filters?: ProductFilters): Promise<Product[]> => {
    let query = "SELECT * FROM Products";
    const queryParams: any[] = [];

    //Se añaden filtros dinamicamente
    if (filters && (filters.price || filters.name)) {
        const conditions: string[] = [];
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

    const [rows]: any = await pool.query(query, queryParams);
    return rows;
};