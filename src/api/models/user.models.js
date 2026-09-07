import connection from "../database/db.js";

const selectUserByEmail = email => {
    const sql = `
        SELECT id, nombre, email, password, es_admin, activo
        FROM usuarios
        WHERE email = ? AND activo = 1
    `;

    return connection.query(sql, [email]);
};

const insertAdminUser = (nombre, email, hashedPassword) => {
    const sql = `
        INSERT INTO usuarios (nombre, email, password, es_admin)
        VALUES (?, ?, ?, 1)
    `;

    return connection.query(sql, [nombre, email, hashedPassword]);
};

export default {
    selectUserByEmail,
    insertAdminUser
};
