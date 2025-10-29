package Entidades;

import java.util.Objects;

public class Pizza extends Producto implements IVendible {

    private final TipoPizza sabor;
    private final TamanoPizza tamano;

    public Pizza(String nombre, double precio, Fabricante fabricante, TipoPizza sabor, TamanoPizza tamano) {
        super(nombre, precio, fabricante); 
        this.sabor = sabor;
        this.tamano = tamano;
    }

    @Override
    public double getPrecioTotal() {
        double precioBase = super.precio; 
        double precioFinal = precioBase;

        switch (this.tamano) {
            case CHICA:
                precioFinal += precioBase * 0.05;
                break;
            case MEDIANA:
                precioFinal += precioBase * 0.10;
                break;
            case GRANDE:
                precioFinal += precioBase * 0.20;
                break;
        }
        return precioFinal;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(super.toString()); 
        sb.append(" - Tipo: ").append(this.sabor);
        sb.append(", Tamanio: ").append(this.tamano);
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
        
        Pizza otro = (Pizza) obj;
        return this.sabor == otro.sabor && this.tamano == otro.tamano;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), this.sabor, this.tamano);
    }
}