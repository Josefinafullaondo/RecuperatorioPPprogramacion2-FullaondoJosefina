package Entidades;

import java.util.Objects;
import java.util.Random;

public abstract class Producto {

    protected final Fabricante fabricante;
    protected final String nombre;
    protected final double precio;
    protected int calorias;
    protected int tiempoPreparacion;
    
    protected static Random generadorAleatorio;

    static {
        Producto.generadorAleatorio = new Random();
    }

    public Producto(String nombre, double precio, Fabricante fabricante) {
        this.nombre = nombre;
        this.precio = precio;
        this.fabricante = fabricante;
        this.calorias = 0; 
        this.tiempoPreparacion = 0; 
    }

    public Producto(String nombre, double precio, String nombreFabricante, 
                    String ciudadFabricante, int antiguedadFabricante) {
        this(nombre, precio, new Fabricante(nombreFabricante, ciudadFabricante, antiguedadFabricante));
    }

    public int getCalorias() {
        if (this.calorias == 0) {
            this.calorias = Producto.generadorAleatorio.nextInt(601) + 200;
        }
        return this.calorias;
    }

    public int getTiempoPreparacion() {
        if (this.tiempoPreparacion == 0) {
            this.tiempoPreparacion = Producto.generadorAleatorio.nextInt(16) + 5;
        }
        return this.tiempoPreparacion;
    }

    private static String mostrar(Producto p) {
        StringBuilder sb = new StringBuilder();
        sb.append("Producto: ").append(p.nombre);
        sb.append(", Precio: $").append(String.format("%.2f", p.precio));
        sb.append(", ").append(p.fabricante.toString());
        sb.append(", Calorias: ").append(p.getCalorias());
        sb.append(", T. Prep: ").append(p.getTiempoPreparacion()).append(" min");
        return sb.toString();
    }

    private static boolean sonIguales(Producto p1, Producto p2) {
        if (p1 == null || p2 == null) {
            return p1 == p2;
        }
        return Objects.equals(p1.nombre, p2.nombre) &&
               Fabricante.sonIguales(p1.fabricante, p2.fabricante);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || !(obj instanceof Producto)) {
            return false;
        }
        Producto otro = (Producto) obj;
        return Producto.sonIguales(this, otro);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.nombre, this.fabricante);
    }

    @Override
    public String toString() {
        return Producto.mostrar(this);
    }
}