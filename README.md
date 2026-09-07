# TP Integrador - International Rock Shop

Este proyecto es una aplicacion web dividida en dos partes:

1. `proyecto-back`: backend con Node.js, Express, EJS, sesiones, bcrypt y MySQL.
2. `proyecto-front`: frontend publico con HTML, CSS y JavaScript puro para simular una tienda con carrito, venta y ticket PDF.

La idea general es vender productos musicales: albumes de rock internacional e instrumentos musicales.

El proyecto sigue una organizacion inspirada en MVC:

- **Modelo**: archivos que hablan con MySQL.
- **Vista**: archivos EJS del backoffice y HTML/CSS del frontend publico.
- **Controlador**: archivos que reciben pedidos, llaman modelos y deciden que responder.
- **Rutas**: archivos que conectan una URL con un controlador.

---

## 1. Orden recomendado de creacion del proyecto

Este es el orden logico en el que un programador desarrollaria esta aplicacion desde cero.

### 1. Definir el objetivo funcional

Primero se define que tiene que hacer la aplicacion:

1. Mostrar productos musicales.
2. Permitir que un comprador ingrese su nombre.
3. Permitir agregar productos al carrito.
4. Permitir confirmar una compra.
5. Registrar la venta en MySQL.
6. Generar un ticket visible en pantalla.
7. Descargar el ticket como PDF usando jsPDF.
8. Tener un panel privado para administradores.
9. Permitir que el admin consulte, cree, modifique y elimine productos.
10. Proteger el panel con login y contrasena hasheada con bcrypt.

### 2. Definir la base de datos

Antes de programar el backend conviene disenar las tablas:

- `usuarios`: usuarios administradores del backoffice.
- `productos`: productos disponibles para vender.
- `ventas`: cabecera de cada venta.
- `ventas_productos`: detalle de productos vendidos en cada venta.

La tabla `ventas_productos` existe porque una venta puede tener muchos productos y un producto puede aparecer en muchas ventas. Esa relacion se resuelve con una tabla intermedia.

### 3. Crear la estructura principal

Se crea una carpeta raiz:

```txt
tp-integrador/
```

Dentro se separa el proyecto en:

```txt
tp-integrador/
  proyecto-back/
  proyecto-front/
```

Esta separacion ayuda a explicar que el backend ofrece datos, login, vistas administrativas y conexion a base de datos; mientras que el frontend publico consume la API para mostrar productos y registrar compras.

### 4. Crear el backend

El backend se crea como proyecto Node.js:

```txt
tp-integrador/proyecto-back/
```

Se instala Express y las librerias necesarias:

- `express`: servidor HTTP.
- `cors`: permite que el frontend pueda consumir la API.
- `dotenv`: lee variables de entorno desde `.env`.
- `mysql2`: conecta Node.js con MySQL.
- `ejs`: motor de vistas para el backoffice.
- `express-session`: permite guardar la sesion del usuario logueado.
- `bcrypt`: hashea y compara contrasenas.
- `nodemon`: reinicia el servidor durante desarrollo.

### 5. Configurar variables de entorno

Se crea `.env.example` como guia:

```env
PORT=3000
DB_HOST=localhost
DB_NAME=tp_integrador_132
DB_USER=root
DB_PASSWORD=
SESSION_KEY=cambiar_esta_clave
```

Luego se crea un `.env` real con los datos de la base local.

### 6. Crear la conexion a MySQL

El archivo `src/api/database/db.js` crea un pool de conexiones usando `mysql2/promise`.

Esto permite reutilizar conexiones y trabajar con `async/await`.

### 7. Crear los modelos

Los modelos son los archivos que ejecutan SQL.

Se crean:

```txt
src/api/models/product.models.js
src/api/models/user.models.js
src/api/models/sale.models.js
```

Cada modelo se encarga de una tabla o grupo de tablas.

### 8. Crear los controladores

Los controladores reciben `req` y `res`, llaman a los modelos y responden al cliente.

Se crean:

```txt
src/api/controllers/product.controllers.js
src/api/controllers/user.controllers.js
src/api/controllers/auth.controllers.js
src/api/controllers/sale.controllers.js
src/api/controllers/view.controllers.js
```

### 9. Crear los middlewares

Los middlewares validan datos o protegen rutas antes de llegar al controlador.

Se crea:

```txt
src/api/middlewares/middlewares.js
```

### 10. Crear las rutas

Las rutas conectan URL con controladores.

Se crean:

```txt
src/api/routes/product.routes.js
src/api/routes/user.routes.js
src/api/routes/sale.routes.js
src/api/routes/auth.routes.js
src/api/routes/view.routes.js
src/api/routes/index.js
```

### 11. Crear el servidor principal

El archivo `index.js` une todo:

- Crea la app de Express.
- Configura EJS.
- Configura middlewares globales.
- Sirve archivos estaticos.
- Activa sesiones.
- Monta rutas.
- Levanta el servidor.

### 12. Crear las vistas EJS del backoffice

Las vistas EJS son las paginas del panel admin:

```txt
src/views/login.ejs
src/views/index.ejs
src/views/get.ejs
src/views/post.ejs
src/views/put.ejs
src/views/delete.ejs
```

Tambien se crean parciales reutilizables:

```txt
src/views/partials/head.ejs
src/views/partials/nav.ejs
src/views/partials/footer.ejs
```

### 13. Crear los scripts publicos del backoffice

Cada pantalla del backoffice tiene JavaScript propio:

```txt
src/public/js/get.js
src/public/js/post.js
src/public/js/put.js
src/public/js/delete.js
```

Esos scripts usan `fetch` para consumir los endpoints de la API.

### 14. Crear el frontend publico

El frontend publico se crea aparte:

```txt
tp-integrador/proyecto-front/
```

Contiene:

```txt
index.html
css/styles.css
js/api.js
js/carrito.js
js/ticket.js
js/main.js
```

Este frontend no usa EJS ni login. Es la tienda para el comprador final.

### 15. Integrar frontend con backend

El frontend llama a:

```txt
GET  http://localhost:3000/api/products
POST http://localhost:3000/api/ventas
```

Con eso puede mostrar productos y registrar compras.

### 16. Probar el flujo completo

El flujo final que se prueba es:

1. Levantar MySQL.
2. Crear base de datos y tablas.
3. Insertar productos.
4. Crear usuario admin.
5. Levantar backend.
6. Entrar al backoffice.
7. Probar CRUD de productos.
8. Abrir frontend publico.
9. Hacer una compra.
10. Verificar `ventas` y `ventas_productos` en phpMyAdmin.
11. Descargar el ticket PDF.

---

## 2. Arquitectura MVC del backend

La aplicacion usa una separacion MVC practica.

### Modelo

Los modelos estan en:

```txt
proyecto-back/src/api/models/
```

Son los unicos archivos que deberian escribir SQL directamente.

Ejemplo de responsabilidad:

- Buscar productos.
- Crear productos.
- Actualizar productos.
- Dar de baja productos.
- Buscar usuarios.
- Crear usuarios admin.
- Registrar ventas.
- Consultar ventas.

### Vista

Las vistas del backoffice estan en:

```txt
proyecto-back/src/views/
```

Son archivos `.ejs`, que permiten renderizar HTML desde el servidor.

Tambien existe una vista publica separada en:

```txt
proyecto-front/index.html
```

### Controlador

Los controladores estan en:

```txt
proyecto-back/src/api/controllers/
```

Se encargan de:

1. Recibir la peticion.
2. Leer parametros, body o session.
3. Llamar al modelo.
4. Resolver errores.
5. Responder JSON o renderizar una vista.

### Rutas

Las rutas estan en:

```txt
proyecto-back/src/api/routes/
```

Conectan una URL con una funcion controladora.

Por ejemplo:

```js
router.get("/", getAllProducts);
```

significa:

```txt
Cuando llegue GET /api/products, ejecutar getAllProducts.
```

---

## 3. Como se monta la aplicacion en Express

Archivo:

```txt
proyecto-back/index.js
```

Este archivo es el punto de entrada del backend.

### Importaciones principales

```js
import express from "express";
import cors from "cors";
import session from "express-session";
```

Express crea el servidor. CORS permite llamadas desde el frontend. Session guarda la sesion del admin logueado.

### Configuracion de EJS

```js
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));
```

Con eso Express sabe que las vistas estan en `src/views` y que se renderizan con EJS.

### Middlewares globales

```js
app.use(cors());
app.use(loggerURL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "src/public")));
```

Cada linea tiene una responsabilidad:

- `cors()`: habilita consumo desde otro origen.
- `loggerURL`: muestra en consola metodo y URL de cada request.
- `express.json()`: permite leer JSON en `req.body`.
- `express.urlencoded()`: permite leer formularios HTML.
- `express.static(...)`: sirve CSS y JS publicos del backoffice.

### Sesiones

```js
app.use(session({
    secret: session_key || "clave_temporal_desarrollo",
    resave: false,
    saveUninitialized: false
}));
```

Esto permite guardar:

```js
req.session.user
```

Cuando un admin inicia sesion correctamente.

### Redireccion inicial

```js
app.get("/", (req, res) => {
    res.redirect("/login");
});
```

Si alguien entra a `/`, el servidor lo manda al login.

### Montaje de rutas

```js
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);
```

Esto significa:

- Todo lo que empiece con `/api/products` lo maneja `product.routes.js`.
- Todo lo que empiece con `/api/users` lo maneja `user.routes.js`.
- Todo lo que empiece con `/api/ventas` lo maneja `sale.routes.js`.
- Todo lo que empiece con `/dashboard` lo maneja `view.routes.js`.
- Todo lo que empiece con `/login` lo maneja `auth.routes.js`.

### Ruta 404

```js
app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
});
```

Si ninguna ruta coincide, responde error 404.

---

## 4. Explicacion archivo por archivo del backend

### `proyecto-back/package.json`

Define el proyecto Node.js.

Contiene:

- Nombre del proyecto.
- Tipo de modulos: `"type": "module"`.
- Scripts:
  - `npm run dev`: levanta con nodemon.
  - `npm start`: levanta con Node.
- Dependencias del backend.

### `proyecto-back/.env.example`

Sirve como plantilla para crear el archivo `.env`.

No contiene secretos reales obligatorios; muestra que variables necesita la app:

- `PORT`
- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `SESSION_KEY`

### `proyecto-back/index.js`

Es el archivo principal del servidor.

Responsabilidades:

1. Crear la app de Express.
2. Configurar EJS.
3. Configurar middlewares globales.
4. Configurar sesiones.
5. Montar rutas.
6. Responder 404.
7. Iniciar el servidor.

### `src/api/config/environments.js`

Lee variables de entorno usando `dotenv`.

Exporta un objeto con:

```js
{
    port,
    session_key,
    database: {
        host,
        name,
        user,
        password
    }
}
```

La ventaja es que el resto del proyecto no lee `process.env` directamente.

### `src/api/database/db.js`

Crea la conexion a MySQL.

Usa:

```js
mysql.createPool(...)
```

Un pool permite reutilizar conexiones en vez de abrir una conexion nueva por cada consulta.

Exporta `connection`, que despues usan todos los modelos.

### `src/api/utils/index.js`

Resuelve rutas absolutas en un proyecto que usa ES Modules.

Como con `"type": "module"` no existe `__dirname` automaticamente, este archivo lo reconstruye usando:

- `fileURLToPath`
- `dirname`
- `join`

Se usa en `index.js` para indicar donde estan las vistas y los archivos estaticos.

### `src/api/middlewares/middlewares.js`

Contiene funciones intermedias que se ejecutan antes de llegar al controlador.

#### `loggerURL(req, res, next)`

Muestra en consola:

```txt
[fecha] METODO URL
```

Sirve para debuguear que rutas se estan usando.

#### `validateId(req, res, next)`

Valida que `req.params.id` sea un entero positivo.

Si es valido, guarda:

```js
req.id = parsedId;
```

Asi el controlador puede usar `req.id` ya validado.

#### `validateProduct(req, res, next)`

Valida datos de producto:

- `name`: string minimo 2 caracteres.
- `image`: string minimo 5 caracteres.
- `price`: numero mayor a 0.
- `category`: debe ser `album` o `instrumento`.

Si hay errores, responde `400`.

#### `validateSale(req, res, next)`

Valida una venta:

- `nombre_usuario` obligatorio.
- `productos` debe ser un array con al menos un item.
- Cada producto debe tener `id_producto`, `cantidad` y `precio_unitario` validos.

#### `requireLogin(req, res, next)`

Protege las vistas del dashboard.

Si no existe:

```js
req.session.user
```

redirige a:

```txt
/login
```

---

## 5. Modelos del backend

### `src/api/models/product.models.js`

Maneja consultas SQL sobre la tabla `productos`.

#### `productColumns`

Define las columnas comunes:

```sql
id,
nombre AS name,
imagen AS image,
categoria AS category,
precio AS price,
activo AS active
```

Se usan alias para que el frontend reciba nombres mas comodos en ingles: `name`, `image`, `category`, `price`.

#### `selectAllProducts()`

Busca productos activos:

```sql
WHERE activo = 1
ORDER BY id DESC
```

Devuelve los productos que se muestran en la tienda y en el dashboard.

#### `selectProductById(id)`

Busca un producto activo por id.

Se usa para consultar, modificar o eliminar desde el backoffice.

#### `insertProduct(name, image, category, price)`

Inserta un producto nuevo.

Recibe datos ya validados por middleware/controlador.

#### `updateProduct(name, image, category, price, active, id)`

Actualiza un producto existente.

Tambien permite cambiar `activo`, por eso puede reactivar o desactivar productos.

#### `deleteProduct(id)`

No borra fisicamente el producto.

Hace una baja logica:

```sql
UPDATE productos SET activo = 0 WHERE id = ?
```

Esto conviene porque si un producto ya fue vendido, borrar el registro podria romper el historial de ventas.

### `src/api/models/user.models.js`

Maneja la tabla `usuarios`.

#### `selectUserByEmail(email)`

Busca un usuario activo por email.

Se usa en el login para recuperar:

- id
- nombre
- email
- password hasheada
- es_admin
- activo

#### `insertAdminUser(nombre, email, hashedPassword)`

Crea un usuario administrador.

Inserta `es_admin = 1`, por eso ese usuario puede entrar al backoffice.

### `src/api/models/sale.models.js`

Maneja ventas y detalle de ventas.

#### `insertSale(nombreUsuario, productos)`

Es una de las funciones mas importantes del proyecto.

Hace una transaccion:

1. Pide una conexion al pool.
2. Inicia transaccion con `beginTransaction()`.
3. Calcula `precioTotal`.
4. Inserta una fila en `ventas`.
5. Obtiene el `idVenta`.
6. Prepara los detalles de cada producto.
7. Inserta multiples filas en `ventas_productos`.
8. Si todo sale bien, hace `commit()`.
9. Si algo falla, hace `rollback()`.
10. Libera la conexion con `release()`.

La transaccion es importante porque una venta debe guardarse completa. No conviene guardar la cabecera en `ventas` si falla el detalle en `ventas_productos`.

#### `selectAllSales()`

Devuelve todas las ventas ordenadas por fecha descendente.

#### `selectSaleById(id)`

Consulta una venta con sus productos.

Usa `INNER JOIN` entre:

- `ventas`
- `ventas_productos`
- `productos`

Sirve para ver el detalle completo de una venta.

---

## 6. Controladores del backend

### `src/api/controllers/product.controllers.js`

Controla las respuestas de productos.

#### `getAllProducts(req, res)`

Llama a `ProductModels.selectAllProducts()`.

Si encuentra productos, responde:

```js
{
    total: rows.length,
    payload: rows
}
```

Si no hay productos, responde 404.

#### `getProductById(req, res)`

Usa `req.id`, que ya fue validado por `validateId`.

Busca un producto por id y responde:

```js
{
    payload: producto
}
```

#### `createProduct(req, res)`

Lee:

```js
const { name, image, category, price } = req.body;
```

Limpia strings con `trim()` e inserta el producto.

#### `modifyProduct(req, res)`

Lee los datos del body y llama a `ProductModels.updateProduct(...)`.

Si no recibe `id`, responde error 400.

#### `removeProduct(req, res)`

Usa `req.id` validado y llama a `ProductModels.deleteProduct(req.id)`.

En realidad hace baja logica, no borrado fisico.

### `src/api/controllers/user.controllers.js`

Controla la creacion de usuarios admin.

#### `createAdminUser(req, res)`

Lee:

```js
const { nameUser, emailUser, passwordUser } = req.body;
```

Luego:

1. Valida que existan los campos.
2. Hashea la password con bcrypt.
3. Inserta el admin en MySQL.
4. Responde con el id creado.

La contrasena nunca se guarda en texto plano.

### `src/api/controllers/auth.controllers.js`

Controla login y logout del backoffice.

#### `loginView(req, res)`

Renderiza `login.ejs`.

#### `getAdminUser(req, res)`

Procesa el formulario de login.

Flujo:

1. Lee `email` y `password`.
2. Valida que existan.
3. Busca el usuario por email.
4. Rechaza si no existe o si `es_admin !== 1`.
5. Compara password ingresada contra password hasheada con `bcrypt.compare`.
6. Si coincide, guarda datos en `req.session.user`.
7. Redirige a `/dashboard/index`.

#### `destroySession(req, res)`

Destruye la sesion y redirige al login.

### `src/api/controllers/sale.controllers.js`

Controla las ventas.

#### `createSale(req, res)`

Lee:

```js
const { nombre_usuario, productos } = req.body;
```

Llama a `SaleModels.insertSale(...)`.

Responde:

```js
{
    message: "Venta registrada con exito",
    id_venta: result.idVenta,
    precio_total: result.precioTotal
}
```

#### `getAllSales(req, res)`

Lista ventas registradas.

#### `getSaleById(req, res)`

Devuelve una venta con todos sus productos.

### `src/api/controllers/view.controllers.js`

Controla las vistas del dashboard.

#### `indexView(req, res)`

Busca productos y renderiza `index.ejs`.

Le pasa a la vista:

- `title`
- `about`
- `user`
- `productsArray`

#### `getView(req, res)`

Renderiza la pantalla de consulta.

#### `createView(req, res)`

Renderiza la pantalla de alta de producto y alta de usuario admin.

#### `updateView(req, res)`

Renderiza la pantalla para buscar un producto y modificarlo.

#### `deleteView(req, res)`

Renderiza la pantalla para buscar un producto y darlo de baja.

---

## 7. Rutas del backend

### `src/api/routes/index.js`

Centraliza exportaciones de rutas.

Esto permite importar todas las rutas juntas en `index.js`:

```js
import { authRoutes, productRoutes, saleRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
```

### `src/api/routes/product.routes.js`

Define endpoints de productos:

```txt
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products
DELETE /api/products/:id
```

Usa middlewares:

- `validateId` para rutas con id.
- `validateProduct` para crear producto.

### `src/api/routes/user.routes.js`

Define:

```txt
POST /api/users
```

Sirve para crear usuarios administradores.

### `src/api/routes/sale.routes.js`

Define endpoints de ventas:

```txt
GET  /api/ventas
GET  /api/ventas/:id
POST /api/ventas
```

Usa:

- `validateId` para consultar una venta por id.
- `validateSale` para crear una venta.

### `src/api/routes/auth.routes.js`

Define rutas del login:

```txt
GET  /login
POST /login
POST /login/destroy
```

### `src/api/routes/view.routes.js`

Define rutas del dashboard:

```txt
GET /dashboard/index
GET /dashboard/get
GET /dashboard/post
GET /dashboard/put
GET /dashboard/delete
```

Todas usan `requireLogin`, por eso no se puede entrar sin sesion.

---

## 8. Vistas EJS del backoffice

### `src/views/partials/head.ejs`

Contiene el inicio del HTML:

- `DOCTYPE`
- `html`
- `head`
- `meta`
- `title`
- CSS externo Sakura Vader
- CSS propio `/css/styles.css`

Se incluye en las demas vistas para evitar repetir codigo.

### `src/views/partials/nav.ejs`

Contiene el header del dashboard.

Incluye:

- Logo `TP`.
- Links a VER, CONSULTAR, CREAR, MODIFICAR y ELIMINAR.
- Nombre del usuario logueado.
- Boton de cerrar sesion.

### `src/views/partials/footer.ejs`

Cierra:

```html
</body>
</html>
```

### `src/views/login.ejs`

Muestra el formulario de login.

El formulario envia:

```txt
POST /login
```

con:

- `email`
- `password`

Si hay error, muestra un mensaje.

### `src/views/index.ejs`

Muestra productos del dashboard.

Usa:

```ejs
productsArray.forEach(producto => { ... })
```

para crear tarjetas con imagen, nombre, id y precio.

### `src/views/get.ejs`

Muestra un formulario para consultar producto por id.

Carga:

```html
<script src="/js/get.js"></script>
```

Ese script hace el `fetch` a `/api/products/:id`.

### `src/views/post.ejs`

Muestra dos formularios:

1. Crear producto.
2. Crear usuario admin.

Carga:

```html
<script src="/js/post.js"></script>
```

### `src/views/put.ejs`

Muestra un formulario para buscar producto por id.

Despues `put.js` genera dinamicamente el formulario de actualizacion.

### `src/views/delete.ejs`

Muestra un formulario para buscar producto por id.

Despues `delete.js` permite confirmar la baja logica del producto.

---

## 9. JavaScript publico del backoffice

Estos archivos estan en:

```txt
proyecto-back/src/public/js/
```

Express los sirve gracias a:

```js
app.use(express.static(join(__dirname, "src/public")));
```

### `src/public/js/get.js`

Se usa en `/dashboard/get`.

Funciones principales:

- Escucha submit del formulario.
- Lee el id ingresado.
- Hace `GET /api/products/:id`.
- Renderiza el producto encontrado.
- Muestra errores si el producto no existe.

### `src/public/js/post.js`

Se usa en `/dashboard/post`.

Funciones principales:

- `mostrarMensaje(tipo, mensaje)`: muestra exito o error.
- `validarProducto(data)`: valida datos antes de mandar al backend.
- Submit de `postProduct-form`: hace `POST /api/products`.
- Submit de `postUser-form`: hace `POST /api/users`.

Este archivo permite crear productos y usuarios administradores desde el backoffice.

### `src/public/js/put.js`

Se usa en `/dashboard/put`.

Flujo:

1. Busca producto por id con `GET /api/products/:id`.
2. Muestra datos encontrados.
3. Al apretar actualizar, crea un formulario dinamico.
4. Envia cambios con `PUT /api/products`.

Funciones importantes:

- `renderizarProducto(producto)`
- `crearFormularioPut(producto)`
- `actualizarProducto(event)`
- `mostrarError(mensaje)`
- `mostrarExito(mensaje)`

### `src/public/js/delete.js`

Se usa en `/dashboard/delete`.

Flujo:

1. Busca producto por id.
2. Muestra producto.
3. Pide confirmacion con `confirm(...)`.
4. Hace `DELETE /api/products/:id`.

El backend hace baja logica, no borrado real.

---

## 10. Frontend publico

El frontend publico esta en:

```txt
proyecto-front/
```

No necesita login. Representa la experiencia de compra.

### `proyecto-front/index.html`

Define las pantallas principales:

1. `pantallaBienvenida`: pide el nombre del comprador.
2. `pantallaProductos`: muestra productos disponibles.
3. `pantallaCarrito`: muestra carrito y total.
4. `pantallaTicket`: muestra ticket y boton para descargar PDF.

Tambien carga:

```html
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
<script src="js/api.js"></script>
<script src="js/carrito.js"></script>
<script src="js/ticket.js"></script>
<script src="js/main.js"></script>
```

El orden de esos scripts importa:

1. Primero jsPDF.
2. Despues funciones de API.
3. Despues funciones de carrito.
4. Despues funciones de ticket.
5. Al final `main.js`, porque usa todo lo anterior.

### `proyecto-front/css/styles.css`

Define el estilo visual de la tienda.

Incluye:

- Variables de color.
- Estilos globales.
- Header.
- Pantallas visibles/ocultas.
- Panel de bienvenida.
- Grid de productos.
- Tarjetas de productos.
- Carrito.
- Ticket.
- Mensajes.
- Media query para pantallas chicas.

### `proyecto-front/js/api.js`

Centraliza llamadas al backend.

#### Constantes

```js
const API_URL = "http://localhost:3000";
const PRODUCTS_URL = `${API_URL}/api/products`;
const SALES_URL = `${API_URL}/api/ventas`;
```

#### `getProductos()`

Hace:

```txt
GET /api/products
```

Devuelve `data.payload`, que es el array de productos.

#### `postVenta(venta)`

Hace:

```txt
POST /api/ventas
```

Envia una venta en formato JSON.

Si el backend responde error, lanza un `Error`.

### `proyecto-front/js/carrito.js`

Maneja el estado del carrito.

#### `const carrito = []`

Array donde se guardan productos seleccionados.

Cada item tiene los datos del producto mas:

```js
cantidad
```

#### `buscarItemCarrito(idProducto)`

Busca si un producto ya existe en el carrito.

#### `agregarAlCarrito(producto)`

Si el producto ya estaba, suma cantidad.

Si no estaba, lo agrega con `cantidad: 1`.

#### `sumarCantidad(idProducto)`

Suma una unidad a un producto del carrito.

#### `restarCantidad(idProducto)`

Resta una unidad.

Si la cantidad llega a 0, quita el producto.

#### `quitarDelCarrito(idProducto)`

Elimina un producto del carrito usando `splice`.

#### `vaciarCarrito()`

Limpia el carrito despues de confirmar una compra.

#### `calcularTotalCarrito()`

Suma:

```js
Number(item.price) * item.cantidad
```

de todos los items.

#### `contarProductosCarrito()`

Cuenta el total de unidades del carrito.

#### `crearPayloadVenta(nombreUsuario)`

Arma el objeto que espera el backend en `POST /api/ventas`.

Devuelve:

```js
{
    nombre_usuario,
    precio_total,
    productos: [
        {
            id_producto,
            cantidad,
            precio_unitario
        }
    ]
}
```

### `proyecto-front/js/ticket.js`

Maneja formato de precios, ticket HTML y PDF.

#### `formatearPrecio(valor)`

Usa:

```js
Intl.NumberFormat("es-AR")
```

para mostrar precios con formato argentino.

Ejemplo:

```txt
1320000 -> 1.320.000,00
```

#### `crearTicketHTML(ticket)`

Recibe un objeto ticket y devuelve HTML para mostrar:

- Cliente.
- Fecha.
- Numero de venta.
- Productos.
- Total.

#### `descargarTicketPDF(ticket)`

Usa jsPDF:

```js
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
```

Escribe los datos del ticket y descarga un archivo:

```txt
ticket-[timestamp].pdf
```

### `proyecto-front/js/main.js`

Coordina toda la tienda publica.

Es el archivo que une:

- HTML.
- API.
- Carrito.
- Ticket.

#### Variables de pantalla

Busca elementos del DOM:

```js
pantallaBienvenida
pantallaProductos
pantallaCarrito
pantallaTicket
```

Tambien busca botones, contenedores y formularios.

#### Estado interno

```js
let nombreUsuario = "";
let ultimoTicket = null;
```

`nombreUsuario` guarda el nombre ingresado por el comprador.

`ultimoTicket` guarda la ultima venta confirmada para poder descargar el PDF.

#### `mostrarPantalla(pantallaActiva)`

Oculta todas las pantallas y muestra solo una.

Funciona agregando o quitando la clase:

```css
pantalla-activa
```

#### `mostrarMensajeProductos(mensaje)`

Muestra errores al cargar productos.

#### `limpiarMensajeProductos()`

Limpia mensajes anteriores.

#### `actualizarContadorCarrito()`

Actualiza el numero del boton Carrito.

Usa:

```js
contarProductosCarrito()
```

#### `renderizarProductos(productos)`

Recibe un array de productos y crea las tarjetas.

Cada tarjeta tiene:

- Imagen.
- Nombre.
- Categoria.
- Precio formateado.
- Boton Agregar.

Cuando se hace click en Agregar:

1. Busca el producto por id.
2. Lo agrega al carrito.
3. Actualiza contador.

#### `obtenerCategoriaLabel(categoria)`

Traduce valores de base de datos a texto visible:

```js
album -> Album musical
instrumento -> Instrumento musical
```

#### `renderizarCarrito()`

Muestra productos del carrito.

Si esta vacio:

- Muestra mensaje.
- Deshabilita confirmar compra.

Si tiene productos:

- Muestra nombre.
- Precio unitario.
- Subtotal.
- Botones `-`, `+` y `Quitar`.
- Actualiza total.

#### `cargarProductos()`

Llama a:

```js
getProductos()
```

y luego:

```js
renderizarProductos(productos)
```

#### Submit de `nombreForm`

Cuando el usuario ingresa su nombre:

1. Cancela recarga del formulario.
2. Lee el nombre.
3. Muestra saludo.
4. Cambia a pantalla productos.
5. Carga productos desde la API.

#### Click en `verCarritoButton`

Renderiza el carrito y muestra la pantalla carrito.

#### Click en `volverProductosButton`

Vuelve a productos.

#### Click en `confirmarCompraButton`

Es el flujo principal de venta:

1. Crea el payload con `crearPayloadVenta(nombreUsuario)`.
2. Envia la venta con `postVenta(payload)`.
3. Recibe `id_venta`.
4. Crea `ultimoTicket`.
5. Renderiza el ticket en pantalla.
6. Vacia carrito.
7. Actualiza contador.
8. Muestra pantalla ticket.

#### Click en `descargarTicketButton`

Si existe `ultimoTicket`, llama:

```js
descargarTicketPDF(ultimoTicket)
```

#### Click en `nuevaCompraButton`

Limpia ticket actual y vuelve a productos.

---

## 11. Flujo completo de una compra

Este es el recorrido que conviene explicar en la exposicion:

1. El usuario abre `proyecto-front/index.html`.
2. Escribe su nombre.
3. `main.js` guarda ese nombre en `nombreUsuario`.
4. `main.js` llama a `getProductos()`.
5. `api.js` hace `GET /api/products`.
6. El backend recibe en `product.routes.js`.
7. La ruta llama a `getAllProducts`.
8. El controlador llama a `ProductModels.selectAllProducts()`.
9. El modelo consulta MySQL.
10. El backend responde JSON.
11. El frontend renderiza las tarjetas.
12. El usuario agrega productos.
13. `carrito.js` guarda items en el array `carrito`.
14. El usuario confirma compra.
15. `carrito.js` arma el payload de venta.
16. `api.js` hace `POST /api/ventas`.
17. `sale.routes.js` recibe el request.
18. `validateSale` valida datos.
19. `createSale` llama a `SaleModels.insertSale`.
20. `insertSale` abre transaccion.
21. Inserta en `ventas`.
22. Inserta en `ventas_productos`.
23. Hace `commit`.
24. Devuelve `idVenta` y `precioTotal`.
25. El frontend arma el ticket.
26. `ticket.js` muestra el ticket en HTML.
27. Si el usuario descarga, `ticket.js` genera PDF con jsPDF.

---

## 12. Flujo completo del login admin

1. El admin entra a:

```txt
http://localhost:3000/login
```

2. `auth.routes.js` ejecuta `loginView`.
3. `loginView` renderiza `login.ejs`.
4. El admin envia email y password.
5. `auth.routes.js` ejecuta `getAdminUser`.
6. `getAdminUser` busca usuario por email usando `UserModels.selectUserByEmail`.
7. Si no existe o no es admin, rechaza.
8. Si existe, compara password con `bcrypt.compare`.
9. Si coincide, guarda el usuario en `req.session.user`.
10. Redirige a:

```txt
/dashboard/index
```

11. Las rutas del dashboard usan `requireLogin`.
12. Si hay sesion, dejan pasar.
13. Si no hay sesion, redirigen a `/login`.

---

## 13. Flujo CRUD de productos

### Ver productos

Ruta visual:

```txt
GET /dashboard/index
```

Flujo:

1. `view.routes.js` llama a `indexView`.
2. `indexView` consulta productos.
3. Renderiza `index.ejs`.

### Consultar producto

Ruta visual:

```txt
GET /dashboard/get
```

Operacion API:

```txt
GET /api/products/:id
```

Flujo:

1. `get.ejs` muestra formulario.
2. `get.js` toma id.
3. Hace fetch a `/api/products/:id`.
4. El backend busca producto y responde JSON.
5. `get.js` renderiza resultado.

### Crear producto

Ruta visual:

```txt
GET /dashboard/post
```

Operacion API:

```txt
POST /api/products
```

Flujo:

1. `post.ejs` muestra formulario.
2. `post.js` valida datos.
3. Envia JSON a `/api/products`.
4. `validateProduct` valida en backend.
5. `createProduct` inserta producto.
6. El frontend muestra mensaje.

### Modificar producto

Ruta visual:

```txt
GET /dashboard/put
```

Operaciones API:

```txt
GET /api/products/:id
PUT /api/products
```

Flujo:

1. Se busca producto por id.
2. `put.js` renderiza formulario de edicion.
3. Se modifican datos.
4. Se envia `PUT /api/products`.
5. El backend actualiza el registro.

### Eliminar producto

Ruta visual:

```txt
GET /dashboard/delete
```

Operacion API:

```txt
DELETE /api/products/:id
```

Flujo:

1. Se busca producto por id.
2. `delete.js` muestra producto.
3. Se confirma baja.
4. El backend ejecuta baja logica.
5. El producto deja de aparecer porque `selectAllProducts` filtra `activo = 1`.

---

## 14. Endpoints disponibles

### Productos

```txt
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products
DELETE /api/products/:id
```

### Usuarios admin

```txt
POST /api/users
```

### Ventas

```txt
GET  /api/ventas
GET  /api/ventas/:id
POST /api/ventas
```

### Login

```txt
GET  /login
POST /login
POST /login/destroy
```

### Dashboard

```txt
GET /dashboard/index
GET /dashboard/get
GET /dashboard/post
GET /dashboard/put
GET /dashboard/delete
```

---

## 15. Como levantar el proyecto

### Backend

Entrar a:

```txt
tp-integrador/proyecto-back
```

Instalar dependencias:

```bash
npm install
```

Crear `.env` usando `.env.example` como guia.

Levantar servidor:

```bash
npm run dev
```

Servidor esperado:

```txt
http://localhost:3000
```

### Backoffice

Entrar a:

```txt
http://localhost:3000/login
```

Usar un usuario admin creado con:

```txt
POST /api/users
```

### Frontend publico

Abrir:

```txt
tp-integrador/proyecto-front/index.html
```

El backend debe estar levantado para que el frontend pueda cargar productos y registrar ventas.

---

## 16. Como crear un usuario admin

No conviene insertar password en texto plano desde phpMyAdmin.

La forma correcta es usar:

```txt
POST http://localhost:3000/api/users
```

Body JSON:

```json
{
  "nameUser": "Admin",
  "emailUser": "admin@admin.com",
  "passwordUser": "admin123"
}
```

El controlador hashea la password con bcrypt antes de guardarla.

---

## 17. Puntos importantes para explicar en la exposicion

### Separacion front/back

El proyecto esta separado en:

- Backend: API, login, dashboard, MySQL.
- Frontend: experiencia de compra.

Esto permite que la tienda consuma datos del backend sin mezclar responsabilidades.

### MVC

El backend separa:

- Rutas: definen URLs.
- Controladores: coordinan request/response.
- Modelos: hacen consultas SQL.
- Vistas: muestran HTML del backoffice.

### Seguridad basica

La password de administradores no se guarda en texto plano.

Se usa:

```js
bcrypt.hash(...)
bcrypt.compare(...)
```

### Sesiones

El login crea:

```js
req.session.user
```

Las rutas del dashboard validan esa sesion con `requireLogin`.

### Baja logica

Eliminar producto no borra la fila.

Actualiza:

```sql
activo = 0
```

Asi se conserva historial de ventas.

### Transacciones

La venta usa transaccion para que se guarde completa:

- Cabecera en `ventas`.
- Detalle en `ventas_productos`.

Si falla una parte, se revierte todo.

### jsPDF

El ticket se genera en frontend con jsPDF.

Primero se muestra en HTML y luego puede descargarse como PDF.

---

## 18. Mejoras posibles

Algunas mejoras que se podrian agregar:

1. Filtros backend con query params:

```txt
GET /api/products?category=album&sort=price_desc
```

2. Validar producto tambien en `PUT /api/products`.
3. Mostrar ventas en una pantalla del dashboard.
4. Agregar paginacion si hay muchos productos.
5. Agregar busqueda por nombre.
6. Mejorar el diseno del ticket PDF.
7. Guardar clientes en una tabla propia si se necesitara historial por comprador.

---

## 19. Resumen final para decir oralmente

Este proyecto implementa una tienda musical con dos partes. El backend esta hecho con Node.js, Express y MySQL siguiendo una estructura MVC: las rutas reciben las URLs, los controladores manejan la logica de cada pedido, los modelos consultan la base de datos y las vistas EJS muestran el panel administrador. El frontend publico esta separado y consume la API para mostrar productos, manejar carrito, registrar ventas y generar un ticket PDF. La aplicacion usa bcrypt para proteger contrasenas, sesiones para controlar el acceso al dashboard, baja logica para productos y transacciones para guardar ventas completas en `ventas` y `ventas_productos`.
