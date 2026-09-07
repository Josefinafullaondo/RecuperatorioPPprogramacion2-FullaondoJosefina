const loggerURL = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            message: "El ID debe ser un numero entero positivo"
        });
    }

    const parsedId = parseInt(id, 10);

    if (parsedId === 0) {
        return res.status(400).json({
            message: "El ID debe ser mayor a 0"
        });
    }

    req.id = parsedId;
    next();
};

const categoriasValidas = ["album", "instrumento"];

const validateProduct = (req, res, next) => {
    const { name, image, price, category } = req.body;
    const errores = [];

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof image !== "string" || image.trim().length < 5) {
        errores.push("La imagen debe ser una URL o ruta valida");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            errores
        });
    }

    next();
};

const validateSale = (req, res, next) => {
    const { nombre_usuario, productos } = req.body;
    const errores = [];

    if (typeof nombre_usuario !== "string" || nombre_usuario.trim().length < 2) {
        errores.push("El nombre del comprador es obligatorio");
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        errores.push("La venta debe incluir al menos un producto");
    }

    if (Array.isArray(productos)) {
        productos.forEach((producto, index) => {
            if (!producto.id_producto || Number(producto.id_producto) <= 0) {
                errores.push(`Producto ${index + 1}: id_producto invalido`);
            }

            if (!Number.isInteger(Number(producto.cantidad)) || Number(producto.cantidad) <= 0) {
                errores.push(`Producto ${index + 1}: cantidad invalida`);
            }

            if (Number(producto.precio_unitario) < 0) {
                errores.push(`Producto ${index + 1}: precio_unitario invalido`);
            }
        });
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos para crear la venta",
            errores
        });
    }

    next();
};

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

export {
    loggerURL,
    validateId,
    validateProduct,
    validateSale,
    requireLogin
};
