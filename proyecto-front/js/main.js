const pantallaBienvenida = document.getElementById("pantallaBienvenida");
const pantallaProductos = document.getElementById("pantallaProductos");
const pantallaCarrito = document.getElementById("pantallaCarrito");
const pantallaTicket = document.getElementById("pantallaTicket");

const nombreForm = document.getElementById("nombreForm");
const saludoUsuario = document.getElementById("saludoUsuario");
const contenedorProductos = document.getElementById("contenedorProductos");
const mensajeProductos = document.getElementById("mensajeProductos");
const verCarritoButton = document.getElementById("verCarritoButton");
const volverProductosButton = document.getElementById("volverProductosButton");
const carritoCantidad = document.getElementById("carritoCantidad");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const carritoTotal = document.getElementById("carritoTotal");
const confirmarCompraButton = document.getElementById("confirmarCompraButton");
const ticketContainer = document.getElementById("ticketContainer");
const descargarTicketButton = document.getElementById("descargarTicketButton");
const nuevaCompraButton = document.getElementById("nuevaCompraButton");

let nombreUsuario = "";
let ultimoTicket = null;

function mostrarPantalla(pantallaActiva) {
    [pantallaBienvenida, pantallaProductos, pantallaCarrito, pantallaTicket].forEach(pantalla => {
        pantalla.classList.remove("pantalla-activa");
    });

    pantallaActiva.classList.add("pantalla-activa");
}

function mostrarMensajeProductos(mensaje) {
    mensajeProductos.textContent = mensaje;
    mensajeProductos.classList.remove("oculto");
}

function limpiarMensajeProductos() {
    mensajeProductos.textContent = "";
    mensajeProductos.classList.add("oculto");
}

function actualizarContadorCarrito() {
    carritoCantidad.textContent = contarProductosCarrito();
}

function renderizarProductos(productos) {
    contenedorProductos.innerHTML = productos.map(producto => `
        <article class="card-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${obtenerCategoriaLabel(producto.category)}</p>
            <p class="precio">$${formatearPrecio(producto.price)}</p>
            <button type="button" data-id="${producto.id}">Agregar</button>
        </article>
    `).join("");

    contenedorProductos.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            const idProducto = Number(button.dataset.id);
            const producto = productos.find(item => item.id === idProducto);
            agregarAlCarrito(producto);
            actualizarContadorCarrito();
        });
    });
}

function obtenerCategoriaLabel(categoria) {
    const labels = {
        album: "Album musical",
        instrumento: "Instrumento musical"
    };

    return labels[categoria] || "Producto";
}

function renderizarCarrito() {
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito esta vacio.</p>";
        confirmarCompraButton.disabled = true;
    } else {
        confirmarCompraButton.disabled = false;
        contenedorCarrito.innerHTML = carrito.map(item => {
            const subtotal = Number(item.price) * item.cantidad;

            return `
                <article class="item-carrito">
                    <div>
                        <h3>${item.name}</h3>
                        <p>$${formatearPrecio(item.price)} c/u</p>
                        <p>Subtotal: $${formatearPrecio(subtotal)}</p>
                    </div>
                    <div class="controles-cantidad">
                        <button type="button" data-action="restar" data-id="${item.id}">-</button>
                        <strong>${item.cantidad}</strong>
                        <button type="button" data-action="sumar" data-id="${item.id}">+</button>
                    </div>
                    <button class="btn-quitar" type="button" data-action="quitar" data-id="${item.id}">Quitar</button>
                </article>
            `;
        }).join("");
    }

    carritoTotal.textContent = formatearPrecio(calcularTotalCarrito());

    contenedorCarrito.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            const idProducto = Number(button.dataset.id);
            const action = button.dataset.action;

            if (action === "sumar") {
                sumarCantidad(idProducto);
            }

            if (action === "restar") {
                restarCantidad(idProducto);
            }

            if (action === "quitar") {
                quitarDelCarrito(idProducto);
            }

            actualizarContadorCarrito();
            renderizarCarrito();
        });
    });
}

async function cargarProductos() {
    try {
        limpiarMensajeProductos();
        const productos = await getProductos();
        renderizarProductos(productos);
    } catch (error) {
        mostrarMensajeProductos(error.message);
    }
}

nombreForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    nombreUsuario = data.nombreUsuario.trim();

    saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
    mostrarPantalla(pantallaProductos);
    await cargarProductos();
});

verCarritoButton.addEventListener("click", () => {
    renderizarCarrito();
    mostrarPantalla(pantallaCarrito);
});

volverProductosButton.addEventListener("click", () => {
    mostrarPantalla(pantallaProductos);
});

confirmarCompraButton.addEventListener("click", async () => {
    const payload = crearPayloadVenta(nombreUsuario);


    try {
        const respuesta = await postVenta(payload);

        ultimoTicket = {
            idVenta: respuesta.id_venta || respuesta.saleId,
            nombreUsuario,
            fecha: new Date().toLocaleString(),
            productos: carrito.map(item => ({ ...item })),
            total: calcularTotalCarrito()
        };

        ticketContainer.innerHTML = crearTicketHTML(ultimoTicket);
        vaciarCarrito();
        actualizarContadorCarrito();
        mostrarPantalla(pantallaTicket);
    } catch (error) {
        contenedorCarrito.innerHTML = `<p class="mensaje">${error.message}</p>`;
    }
});

descargarTicketButton.addEventListener("click", () => {
    if (ultimoTicket) {
        descargarTicketPDF(ultimoTicket);
    }
});

nuevaCompraButton.addEventListener("click", () => {
    ultimoTicket = null;
    ticketContainer.innerHTML = "";
    mostrarPantalla(pantallaProductos);
});
