require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const app = require("./app");

app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000","http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();


