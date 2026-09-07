import bcrypt from "bcrypt";
import UserModels from "../models/user.models.js";

export const createAdminUser = async (req, res) => {
    try {
        const { nameUser, emailUser, passwordUser } = req.body;

        if (!nameUser || !emailUser || !passwordUser) {
            return res.status(400).json({
                message: "Datos invalidos, faltan campos"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordUser, saltRounds);
        const [result] = await UserModels.insertAdminUser(nameUser, emailUser, hashedPassword);

        res.status(201).json({
            message: "Usuario admin creado con exito",
            userId: result.insertId
        });
    } catch (error) {
        console.error("Error creando usuario admin: ", error.message);
        res.status(500).json({
            message: "Error interno al crear usuario"
        });
    }
};
