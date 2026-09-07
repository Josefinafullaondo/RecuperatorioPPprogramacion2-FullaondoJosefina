import ProductModels from "../models/product.models.js";

export const indexView = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        res.render("index", {
            title: "Inicio",
            about: "Nuestros productos",
            user: req.session.user,
            productsArray: rows
        });
    } catch (error) {
        console.error("Error renderizando dashboard: ", error.message);
        res.render("index", {
            title: "Inicio",
            about: "No se pudieron cargar los productos",
            user: req.session.user,
            productsArray: []
        });
    }
};

export const getView = (req, res) => {
    res.render("get", {
        title: "Consultar",
        about: "Consultar producto por id:",
        user: req.session.user
    });
};

export const createView = (req, res) => {
    res.render("post", {
        title: "Crear",
        about: "Crear producto",
        user: req.session.user
    });
};

export const updateView = (req, res) => {
    res.render("put", {
        title: "Modificar",
        about: "Consultar producto por id:",
        user: req.session.user
    });
};

export const deleteView = (req, res) => {
    res.render("delete", {
        title: "Eliminar",
        about: "Consultar producto por id:",
        user: req.session.user
    });
};
