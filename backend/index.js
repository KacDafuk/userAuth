const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const User = require("./models/user.model");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Argon:data09@task4.pax4bca.mongodb.net/?retryWrites=true&w=majority"
);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT || port, () => {
  console.log(`Example app is listening at http://localhost:${port}`);
});
app.get("/test", (req, res) => {
  res.json({ respData: "connected" });
});
