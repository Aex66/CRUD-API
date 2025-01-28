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
exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const database_1 = __importDefault(require("../database"));
/**
 * Crea un nuevo usuario
 * @param name - Nombre del usuario
 * @param email - Email del usuario
 * @returns
 */
const createUser = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield database_1.default.query("INSERT INTO Users (name, email) VALUES (?, ?)", [name, email]);
    return result.insertId; // devuelve el ID del nuevo usuario
});
exports.createUser = createUser;
/**
 * Obtener un usuario basado en su ID
 * @param id - ID del usuario
 * @returns
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.default.query("SELECT * FROM Users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
});
exports.getUserById = getUserById;
/**
 * Obtiene todos los usuarios
 * @returns
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield database_1.default.query("SELECT * FROM Users");
    return rows;
});
exports.getAllUsers = getAllUsers;
