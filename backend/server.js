const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/login-app");

const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  res.json({ status: "ok" });
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
