const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const urlBase = "http://localhost:3000/api/products";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();
    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Ingresa un id valido");
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        renderizarProducto(datos.payload);
    } catch (error) {
        mostrarError(error.message);
    }
});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <article class="lista-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
            <input type="button" id="deleteProduct-button" value="Dar de baja">
        </article>
    `;

    document.getElementById("deleteProduct-button").addEventListener("click", () => {
        const confirmacion = confirm("Queres dar de baja este producto?");

        if (confirmacion) {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            mostrarError(result.message);
            return;
        }

        mostrarExito(result.message);
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `<p class="mensaje mensaje-error">${mensaje}</p>`;
}

function mostrarExito(mensaje) {
    contenedorProductos.innerHTML = `<p class="mensaje mensaje-exito">${mensaje}</p>`;
}
