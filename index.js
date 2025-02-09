const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postsRoutes = require("./routes/posts");

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/posts", postsRoutes);

const { dbConnection } = require("./config/config");

dbConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));