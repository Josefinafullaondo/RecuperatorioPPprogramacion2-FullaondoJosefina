const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const contenedorForm = document.getElementById("contenedor-form");
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
            <input type="button" id="updateProduct-button" value="Actualizar producto">
        </article>
    `;

    document.getElementById("updateProduct-button").addEventListener("click", () => {
        crearFormularioPut(producto);
    });
}

function crearFormularioPut(producto) {
    contenedorForm.innerHTML = `
        <form id="updateProduct-form" class="form-alta">
            <input type="hidden" name="id" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="album">album musical</option>
                <option value="instrumento">instrumento musical</option>
            </select>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>

            <label for="activeProd">Activo</label>
            <select name="active" id="activeProd" required>
                <option value="1">activo</option>
                <option value="0">inactivo</option>
            </select>

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    document.getElementById("categoryProd").value = producto.category || "album";
    document.getElementById("activeProd").value = String(producto.active ?? 1);
    document.getElementById("updateProduct-form").addEventListener("submit", actualizarProducto);
}

async function actualizarProducto(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    data.price = Number(data.price);
    data.active = Number(data.active);

    try {
        const response = await fetch(urlBase, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            mostrarError(result.message);
            return;
        }

        contenedorForm.innerHTML = "";
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
