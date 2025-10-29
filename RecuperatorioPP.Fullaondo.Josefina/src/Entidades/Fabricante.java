package Entidades;

import java.util.Objects;

public class Fabricante {

    private final String nombre;
    private final String ciudad;
    private final int antiguedad;

    public Fabricante(String nombre, String ciudad, int antiguedad) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.antiguedad = antiguedad;
    }

    public static boolean sonIguales(Fabricante f1, Fabricante f2) {
        if (f1 == null || f2 == null) {
            return f1 == f2; 
        }
        return f1.antiguedad == f2.antiguedad &&
               Objects.equals(f1.nombre, f2.nombre) &&
               Objects.equals(f1.ciudad, f2.ciudad);
    }

    private String getInfoFabricante() {
        StringBuilder sb = new StringBuilder();
        sb.append("Fabricante: ").append(this.nombre);
        sb.append(" (").append(this.ciudad);
        sb.append(", ").append(this.antiguedad).append(" anios)");
        return sb.toString();
    }

    @Override
    public String toString() {
        return this.getInfoFabricante();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || this.getClass() != obj.getClass()) {
            return false;
        }
        Fabricante otro = (Fabricante) obj;
        return Fabricante.sonIguales(this, otro);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.nombre, this.ciudad, this.antiguedad);
    }
}