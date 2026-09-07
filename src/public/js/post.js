const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form");
const postUserForm = document.getElementById("postUser-form");

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `<p class="mensaje mensaje-${tipo}">${mensaje}</p>`;
}

function validarProducto(data) {
    const errores = [];

    if (!data.name || data.name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.image || data.image.trim().length < 5) {
        errores.push("La imagen es obligatoria");
    }

    if (!data.price || Number(data.price) <= 0) {
        errores.push("El precio debe ser mayor a 0");
    }

    if (!data.category) {
        errores.push("Debe seleccionar una categoria");
    }

    return errores;
}

postProductForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    data.price = Number(data.price);

    const errores = validarProducto(data);

    if (errores.length > 0) {
        mostrarMensaje("error", errores.join(" / "));
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        mostrarMensaje("exito", result.message);
        event.target.reset();
    } catch (error) {
        mostrarMensaje("error", error.message);
    }
});

postUserForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());

    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        mostrarMensaje("exito", result.message);
        event.target.reset();
    } catch (error) {
        mostrarMensaje("error", error.message);
    }
});
