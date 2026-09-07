const API_URL = "http://localhost:3000";
const PRODUCTS_URL = `${API_URL}/api/products`;
const SALES_URL = `${API_URL}/api/ventas`;

async function getProductos() {
    const response = await fetch(PRODUCTS_URL);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "No se pudieron obtener los productos");
    }

    return data.payload;
}

async function postVenta(venta) {
    const response = await fetch(SALES_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venta)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "No se pudo registrar la venta");
    }

    return data;
}
