import bcrypt from "bcrypt";
import UserModels from "../models/user.models.js";

export const loginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduci tu email y password"
    });
};

export const getAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                title: "Login",
                about: "Introduci tu email y password",
                error: "Todos los campos son obligatorios"
            });
        }

        const [rows] = await UserModels.selectUserByEmail(email);

        if (rows.length === 0 || rows[0].es_admin !== 1) {
            return res.status(401).render("login", {
                title: "Login",
                about: "Introduci tu email y password",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).render("login", {
                title: "Login",
                about: "Introduci tu email y password",
                error: "Credenciales incorrectas"
            });
        }

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            es_admin: user.es_admin
        };

        res.redirect("/dashboard/index");
    } catch (error) {
        console.error("Error en login: ", error.message);
        res.status(500).render("login", {
            title: "Login",
            about: "Introduci tu email y password",
            error: "Error interno del servidor"
        });
    }
};

export const destroySession = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al destruir la sesion: ", err);
            return res.status(500).json({
                message: "Error al cerrar sesion"
            });
        }

        res.redirect("/login");
    });
};
