import { Request, Response } from "express";
import { createProduct, getAllProducts, getProductById } from "../models/Product";
  
//Crea un nuevo producto
export const createProductController = async (req: Request, res: Response) => {
    const { name, price, createdBy } = req.body;
    try {
        if (isNaN(price)) {
            res.status(422).json({ message: 'Precio invalido'})
            return;
        }

        const productId = await createProduct(name, price, createdBy)
        res.status(201).json({ id: productId, name, price, createdBy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

//Obtiene un producto por su ID
export const getProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await getProductById(Number(id));
        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

//Obtiene la lista de productos con opcion de filtrarlos
export const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const { price, name } = req.query;

        if (price || name) {
            const products = await getAllProducts({ price: Number(price), name: name as string })
            res.status(200).json(products);
            return;
        }

        const products = await getAllProducts()

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al listar los productos" });
    }
};