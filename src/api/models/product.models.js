import connection from "../database/db.js";

const productColumns = `
    id,
    nombre AS name,
    imagen AS image,
    categoria AS category,
    precio AS price,
    activo AS active
`;

const selectAllProducts = () => {
    const sql = `
        SELECT ${productColumns}
        FROM productos
        WHERE activo = 1
        ORDER BY id DESC
    `;

    return connection.query(sql);
};

const selectProductById = id => {
    const sql = `
        SELECT ${productColumns}
        FROM productos
        WHERE id = ? AND activo = 1
    `;

    return connection.query(sql, [id]);
};

const insertProduct = (name, image, category, price) => {
    const sql = `
        INSERT INTO productos (nombre, imagen, categoria, precio)
        VALUES (?, ?, ?, ?)
    `;

    return connection.query(sql, [name, image, category, price]);
};

const updateProduct = (name, image, category, price, active, id) => {
    const sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [name, image, category, price, active, id]);
};

const deleteProduct = id => {
    const sql = "UPDATE productos SET activo = 0 WHERE id = ?";
    return connection.query(sql, [id]);
};

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
};
