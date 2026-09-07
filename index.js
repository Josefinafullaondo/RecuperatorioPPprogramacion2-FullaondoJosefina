import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, saleRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

const { port, session_key } = environments;
const app = express();
const PORT = port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(cors());
app.use(loggerURL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "src/public")));
app.use(session({
    secret: session_key || "clave_temporal_desarrollo",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
