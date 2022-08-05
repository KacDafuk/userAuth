const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const User = require("./models/user.model");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Argon:data09@task4.pax4bca.mongodb.net/?retryWrites=true&w=majority"
);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/test", async (req, res) => {
  const user = await User.findOne({});
  res.json({ user, data: "some data" });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app is listening at http://localhost:${port}`);
});
app.post("/register", async (req, res) => {
  const { email, password, curTime, name } = req.body;
  const user = await User.findOne({ email });
  res.json({ status: user });
  if (user) {
    return res.json({ status: "error", message: "email already taken" });
  }
  let newPassword;
  try {
    newPassword = await bcrypt.hash(password);
  } catch (e) {
    resp.json({ status: e.message, a: "BCRYPT FAIL" });
  }
  try {
    await User.create({
      email,
      password: newPassword,
      blocked: false,
      registrationTime: curTime,
      lastLoginTime: "-",
      name: name,
    });
    res.json({ status: 200, message: "user created" });
  } catch (e) {
    e.message;
    res.json({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, blocked, curTime } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: "404", message: "incorrect data" });
  }
  await User.updateOne({ email }, { $set: { lastLoginTime: curTime } });
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (e) {
    resp.json({ status: e.message });
  }
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "200", user: token });
  }
});

app.post("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const { email } = jwt.verify(token, "secret123");
    const users = await User.find({}, { password: 0, __v: 0 });
    const currentUser = await User.findOne({ email });
    return res.json({ status: "ok", users, currentUser });
  } catch (error) {
    res.json({ status: "498", error: "invalid token" });
  }
});
app.post("/dashboard/delete", async (req, res) => {
  try {
    const toDeleteUsersEmails = req.body;
    await User.deleteMany({ email: { $in: toDeleteUsersEmails } });
    const users = await User.find();
    return res.json({ status: "ok", users });
  } catch (e) {}
});
app.post("/dashboard/block", async (req, res) => {
  try {
    const toDeleteUsersEmails = req.body;
    await User.updateMany(
      { email: { $in: toDeleteUsersEmails } },
      { blocked: true }
    );
    const users = await User.find();
    return res.json({ status: "ok", users });
  } catch (e) {
    //handle error
  }
});
app.post("/dashboard/unblock", async (req, res) => {
  try {
    const toUnblockUsers = req.body;
    await User.updateMany(
      { email: { $in: toUnblockUsers } },
      { blocked: false }
    );
    const users = await User.find();
    return res.json({ status: "ok", users });
  } catch (e) {}
});
