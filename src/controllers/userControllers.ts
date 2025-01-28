import { Request, Response } from "express";
import { createUser, getUserById, getAllUsers } from "../models/User";
import { validateEmail } from "../utils/userUtils";
  
//Crea un nuevo usuario
export const createUserController = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const validEmail = await validateEmail(email)
        if (!validEmail) {
            res.status(422).json({ message: 'Email invalido'})
            return;
        }

        const userId = await createUser(name, email);
        res.status(201).json({ id: userId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};

//Obtiene un usuario por su ID
export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(Number(id));
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

//Lista todos los usuarios
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al listar los usuarios" });
    }
};
