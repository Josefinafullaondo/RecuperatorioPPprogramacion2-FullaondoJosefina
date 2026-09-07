import ProductModels from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo productos: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectProductById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows[0]
        });
    } catch (error) {
        console.error("Error obteniendo producto: ", error.message);
        res.status(500).json({
            message: `Error interno al obtener producto con id ${req.id}`
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, image, category, price } = req.body;
        const cleanName = name.trim();
        const cleanImage = image.trim();
        const [result] = await ProductModels.insertProduct(cleanName, cleanImage, category, price);

        res.status(201).json({
            message: `Producto creado con exito con id ${result.insertId}`,
            productId: result.insertId
        });
    } catch (error) {
        console.error("Error creando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al crear producto"
        });
    }
};

export const modifyProduct = async (req, res) => {
    try {
        const { id, name, image, category, price, active = 1 } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "El id del producto es obligatorio"
            });
        }

        const [result] = await ProductModels.updateProduct(name, image, category, price, active, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} actualizado correctamente`
        });
    } catch (error) {
        console.error("Error actualizando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al actualizar producto"
        });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const [result] = await ProductModels.deleteProduct(req.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encontro el producto"
            });
        }

        res.status(200).json({
            message: `Producto con id ${req.id} dado de baja correctamente`
        });
    } catch (error) {
        console.error("Error dando de baja producto: ", error.message);
        res.status(500).json({
            message: "Error interno al dar de baja producto"
        });
    }
};
