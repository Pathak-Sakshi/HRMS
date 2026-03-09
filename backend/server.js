require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000","http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected to MySQL!" });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();