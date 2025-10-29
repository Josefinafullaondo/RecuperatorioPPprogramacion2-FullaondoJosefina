package Entidades;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Pizzeria implements Iterable<Producto> {

    private final String nombre;
    private final int capacidad;
    private final Collection<Producto> productos;

    public Pizzeria(String nombre) {
        this(nombre, 3);
    }

    public Pizzeria(String nombre, int capacidad) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.productos = new ArrayList<>();
    }

    private boolean sonIguales(Producto producto) {
        return this.productos.contains(producto);
    }

    public void agregar(Producto producto) {
        if (this.productos.size() >= this.capacidad) {
            System.out.println("Error: Capacidad maxima de la pizzeria alcanzada. No se pudo agregar: " + producto.nombre);
            return;
        }
        
        if (this.sonIguales(producto)) {
            System.out.println("Error: El producto ya se encuentra en la pizzeria. No se pudo agregar: " + producto.nombre);
            return;
        }

        this.productos.add(producto);
        System.out.println("Producto agregado: " + producto.nombre);
    }

    private double getPrecioProductos(TipoProducto tipo) {
        double total = 0;
        
        for (Producto p : this.productos) {
            
            if (p instanceof IVendible) {
                IVendible vendible = (IVendible) p; 
                
                switch (tipo) {
                    case PIZZAS:
                        if (p instanceof Pizza) { 
                            total += vendible.getPrecioTotal();
                        }
                        break;
                    case POSTRES:
                        if (p instanceof Postre) { 
                            total += vendible.getPrecioTotal();
                        }
                        break;
                    case TODOS:
                        total += vendible.getPrecioTotal();
                        break;
                }
            }
        }
        return total;
    }

    private double getPrecioDePizzas() {
        return this.getPrecioProductos(TipoProducto.PIZZAS);
    }

    private double getPrecioDePostres() {
        return this.getPrecioProductos(TipoProducto.POSTRES);
    }

    private double getPrecioTotal() {
        return this.getPrecioProductos(TipoProducto.TODOS);
    }

    @Override
    public Iterator<Producto> iterator() {
        return this.productos.iterator();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        
        sb.append("Pizzeria: ").append(this.nombre);
        sb.append(" (Capacidad: ").append(this.capacidad).append(")\n");
        sb.append("Cantidad actual de productos: ").append(this.productos.size()).append("\n");
        
        sb.append("--- Detalle de Productos ---").append("\n");
        for (Producto p : this) {
            sb.append(p.toString()).append("\n");
        }
        
        sb.append("--- Totales ---").append("\n");
        sb.append(String.format("Precio Total Pizzas: $%.2f\n", this.getPrecioDePizzas()));
        sb.append(String.format("Precio Total Postres: $%.2f\n", this.getPrecioDePostres()));
        sb.append(String.format("Precio Total General: $%.2f\n", this.getPrecioTotal()));
        
        return sb.toString();
    }
}