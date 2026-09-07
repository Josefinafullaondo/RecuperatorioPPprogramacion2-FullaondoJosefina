const carrito = [];

function buscarItemCarrito(idProducto) {
    return carrito.find(item => item.id === idProducto);
}

function agregarAlCarrito(producto) {
    const item = buscarItemCarrito(producto.id);

    if (item) {
        item.cantidad += 1;
        return;
    }

    carrito.push({
        ...producto,
        cantidad: 1
    });
}

function sumarCantidad(idProducto) {
    const item = buscarItemCarrito(idProducto);

    if (item) {
        item.cantidad += 1;
    }
}

function restarCantidad(idProducto) {
    const item = buscarItemCarrito(idProducto);

    if (!item) {
        return;
    }

    item.cantidad -= 1;

    if (item.cantidad <= 0) {
        quitarDelCarrito(idProducto);
    }
}

function quitarDelCarrito(idProducto) {
    const index = carrito.findIndex(item => item.id === idProducto);

    if (index !== -1) {
        carrito.splice(index, 1);
    }
}

function vaciarCarrito() {
    carrito.splice(0, carrito.length);
}

function calcularTotalCarrito() {
    return carrito.reduce((total, item) => {
        return total + Number(item.price) * item.cantidad;
    }, 0);
}

function contarProductosCarrito() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

function crearPayloadVenta(nombreUsuario) {
    return {
        nombre_usuario: nombreUsuario,
        precio_total: calcularTotalCarrito(),
        productos: carrito.map(item => ({
            id_producto: item.id,
            cantidad: item.cantidad,
            precio_unitario: Number(item.price)
        }))
    };
}
