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
exports.getAllUsersController = exports.getUserByIdController = exports.createUserController = void 0;
const User_1 = require("../models/User");
const userUtils_1 = require("../utils/userUtils");
//Crea un nuevo usuario
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const validEmail = yield (0, userUtils_1.validateEmail)(email);
        if (!validEmail) {
            res.status(422).json({ message: 'Email invalido' });
            return;
        }
        const userId = yield (0, User_1.createUser)(name, email);
        res.status(201).json({ id: userId, name, email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
});
exports.createUserController = createUserController;
//Obtiene un usuario por su ID
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, User_1.getUserById)(Number(id));
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
});
exports.getUserByIdController = getUserByIdController;
//Lista todos los usuarios
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, User_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al listar los usuarios" });
    }
});
exports.getAllUsersController = getAllUsersController;
