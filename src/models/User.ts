import pool from "../database";

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

/**
 * Crea un nuevo usuario
 * @param name - Nombre del usuario
 * @param email - Email del usuario
 * @returns
 */
export const createUser = async (name: string, email: string): Promise<number> => {
    const [result]: any = await pool.query("INSERT INTO Users (name, email) VALUES (?, ?)", [name, email]);
    return result.insertId; // devuelve el ID del nuevo usuario
};

/**
 * Obtener un usuario basado en su ID
 * @param id - ID del usuario
 * @returns 
 */
export const getUserById = async (id: number): Promise<User | null> => {
    const [rows]: any = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
};

/**
 * Obtiene todos los usuarios
 * @returns 
 */
export const getAllUsers = async (): Promise<User[]> => {
    const [rows]: any = await pool.query("SELECT * FROM Users");
    return rows;
};
