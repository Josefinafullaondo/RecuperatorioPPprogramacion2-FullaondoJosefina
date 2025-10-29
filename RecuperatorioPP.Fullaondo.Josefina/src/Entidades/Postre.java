package Entidades;

import java.util.Objects;

public class Postre extends Producto implements IVendible {

    private final TipoPostre tipoPostre;

    public Postre(String nombre, double precio, Fabricante fabricante, TipoPostre tipoPostre) {
        super(nombre, precio, fabricante); 
        this.tipoPostre = tipoPostre;
    }

    @Override
    public double getPrecioTotal() {
        double precioBase = super.precio; 
        double precioFinal = precioBase;

        switch (this.tipoPostre) {
            case TIRAMISU:
                precioFinal += precioBase * 0.20;
                break;
            case HELADO:
                precioFinal += precioBase * 0.15;
                break;
            case FLAN:
                precioFinal += precioBase * 0.10;
                break;
        }
        return precioFinal;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(super.toString()); 
        sb.append(" - Tipo: ").append(this.tipoPostre);
        sb.append(", Precio Total: $").append(String.format("%.2f", this.getPrecioTotal()));
        return sb.toString();
    }

    @Override
    public boolean equals(Object obj) {
        if (!super.equals(obj)) {
            return false;
        }
        if (this.getClass() != obj.getClass()) {
             return false;
        }
        
        Postre that = (Postre) obj;
        return this.tipoPostre == that.tipoPostre;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), this.tipoPostre);
    }
}