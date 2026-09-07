import mysql from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
    waitForConnections: true,
    connectionLimit: 10
});

export default connection;
