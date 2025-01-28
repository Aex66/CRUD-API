import express from "express";
import userRoutes from "./routes/userRoutes"
import orderRoutes from "./routes/orderRoutes"
import productRoutes from "./routes/productRoutes"
const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
