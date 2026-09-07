import SaleModels from "../models/sale.models.js";

export const createSale = async (req, res) => {
    try {
        const { nombre_usuario, productos } = req.body;
        const result = await SaleModels.insertSale(nombre_usuario.trim(), productos);

        res.status(201).json({
            message: "Venta registrada con exito",
            id_venta: result.idVenta,
            precio_total: result.precioTotal
        });
    } catch (error) {
        console.error("Error creando venta: ", error.message);
        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
};

export const getAllSales = async (req, res) => {
    try {
        const [rows] = await SaleModels.selectAllSales();

        res.status(200).json({
            total: rows.length,
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo ventas: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener ventas"
        });
    }
};

export const getSaleById = async (req, res) => {
    try {
        const [rows] = await SaleModels.selectSaleById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro venta con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo venta: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener venta"
        });
    }
};
