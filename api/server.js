import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import allBooksRoutes from "../api/src/routes/bookRoutes.js";
import allUsersRoutes from "../api/src/routes/userRoutes.js";
//import allOrdersRoutes from "../api/src/routes/ordersRoutes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello Word"));

app.use("/api", allBooksRoutes);
app.use("/api", allUsersRoutes);
//app.use("/api", allOrdersRoutes);

app.listen(port, () => console.log(`✅ Server running on the port ${port}`));
