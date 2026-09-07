import connection from "../database/db.js";

const insertSale = async (nombreUsuario, productos) => {
    const db = await connection.getConnection();

    try {
        await db.beginTransaction();

        const precioTotal = productos.reduce((total, producto) => {
            return total + Number(producto.precio_unitario) * Number(producto.cantidad);
        }, 0);

        const [ventaResult] = await db.query(
            "INSERT INTO ventas (nombre_usuario, precio_total) VALUES (?, ?)",
            [nombreUsuario, precioTotal]
        );

        const idVenta = ventaResult.insertId;
        const detalles = productos.map(producto => {
            const cantidad = Number(producto.cantidad);
            const precioUnitario = Number(producto.precio_unitario);
            const subtotal = cantidad * precioUnitario;

            return [idVenta, Number(producto.id_producto), cantidad, precioUnitario, subtotal];
        });

        await db.query(
            "INSERT INTO ventas_productos (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES ?",
            [detalles]
        );

        await db.commit();

        return {
            idVenta,
            precioTotal
        };
    } catch (error) {
        await db.rollback();
        throw error;
    } finally {
        db.release();
    }
};

const selectAllSales = () => {
    const sql = `
        SELECT id, nombre_usuario, fecha, precio_total
        FROM ventas
        ORDER BY fecha DESC
    `;

    return connection.query(sql);
};

const selectSaleById = id => {
    const sql = `
        SELECT
            v.id AS id_venta,
            v.nombre_usuario,
            v.fecha,
            v.precio_total,
            p.id AS id_producto,
            p.nombre AS producto,
            vp.cantidad,
            vp.precio_unitario,
            vp.subtotal
        FROM ventas v
        INNER JOIN ventas_productos vp ON vp.id_venta = v.id
        INNER JOIN productos p ON p.id = vp.id_producto
        WHERE v.id = ?
    `;

    return connection.query(sql, [id]);
};

export default {
    insertSale,
    selectAllSales,
    selectSaleById
};
