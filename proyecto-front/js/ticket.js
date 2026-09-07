function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(valor));
}

function crearTicketHTML(ticket) {
    const productosHTML = ticket.productos.map(producto => {
        const subtotal = Number(producto.price) * producto.cantidad;

        return `
            <li>
                ${producto.name} x ${producto.cantidad} - $${formatearPrecio(subtotal)}
            </li>
        `;
    }).join("");

    return `
        <h3>Ticket de compra</h3>
        <p>Cliente: ${ticket.nombreUsuario}</p>
        <p>Fecha: ${ticket.fecha}</p>
        <p>Venta: ${ticket.idVenta || "pendiente"}</p>
        <ul>${productosHTML}</ul>
        <strong>Total: $${formatearPrecio(ticket.total)}</strong>
    `;
}

function descargarTicketPDF(ticket) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text("Ticket de compra", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Cliente: ${ticket.nombreUsuario}`, 10, y);
    y += 7;
    doc.text(`Fecha: ${ticket.fecha}`, 10, y);
    y += 7;
    doc.text(`Venta: ${ticket.idVenta || "pendiente"}`, 10, y);
    y += 10;

    ticket.productos.forEach(producto => {
        const subtotal = Number(producto.price) * producto.cantidad;
        doc.text(`${producto.name} x ${producto.cantidad} - $${formatearPrecio(subtotal)}`, 10, y);
        y += 7;
    });

    y += 5;
    doc.text(`Total: $${formatearPrecio(ticket.total)}`, 10, y);
    doc.save(`ticket-${Date.now()}.pdf`);
}
