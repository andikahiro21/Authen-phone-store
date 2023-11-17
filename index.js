const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index.js");
const PORT = 3000;
const path = require("path");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", routes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "API Not Found" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
