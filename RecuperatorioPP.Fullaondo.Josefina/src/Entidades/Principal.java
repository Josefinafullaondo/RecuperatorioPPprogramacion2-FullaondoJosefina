package Entidades;

public class Principal {

    public static void main(String[] args) {
        
        // FABRICANTES
        Fabricante f1 = new Fabricante("Ugi's", "CABA", 15);
        Fabricante f2 = new Fabricante("Fabrica de Pizzas", "Buenos Aires", 10);
        Fabricante f3 = new Fabricante("La Tradicion", "Cordoba", 8);
        
        // PRODUCTOS
        Pizza p1 = new Pizza("Napolitana Clasica", 2500, f1, TipoPizza.NAPOLITANA, TamanoPizza.GRANDE);
        Pizza p2 = new Pizza("Muzza de la Casa", 2200, f2, TipoPizza.MUZZARELLA, TamanoPizza.MEDIANA);
        Pizza p3 = new Pizza("Calabresa Picante", 2300, f1, TipoPizza.CALABRESA, TamanoPizza.CHICA);
        
        Postre d1 = new Postre("Tiramisu Italiano", 1800, f2, TipoPostre.TIRAMISU);
        Postre d2 = new Postre("Helado Artesanal", 1500, f3, TipoPostre.HELADO);
        Postre d3 = new Postre("Flan Casero", 1200, f1, TipoPostre.FLAN);
        
        // PIZZERÍA
        Pizzeria pizzeria = new Pizzeria("La Buena Pizza", 6);
        
        pizzeria.agregar(p1);
        
        // Intento de agregar producto repetido
        Pizza p4 = new Pizza("Napolitana Clasica", 2500, f1, TipoPizza.NAPOLITANA, TamanoPizza.GRANDE);
        pizzeria.agregar(p4);
        
        pizzeria.agregar(d3);
        pizzeria.agregar(p2);
        pizzeria.agregar(p3);
        pizzeria.agregar(d1);
        pizzeria.agregar(d2);
        
        // Intento de agregar superando capacidad
        pizzeria.agregar(d3);
        
        // MOSTRAR INFORME COMPLETO (debe incluir precios totales)
        System.out.println("\n===== INFORMACION COMPLETA DE LA PIZZERIA =====");
        System.out.println(pizzeria.toString());
        
        // ITERACIÓN EXPLÍCITA DESDE Pizzeria
        System.out.println("\n===== INTERACION EXPLICITA DESDE PIZZERIA =====");
        for (Producto producto : pizzeria) {
            System.out.println(producto);
        }
    }
}