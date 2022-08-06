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
  res.json({ user });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app is listening at http://localhost:${port}`);
});
app.post("/register", async (req, res) => {
  const { email, password, curTime, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ status: 404, message: "email already taken" });
  }
  const newPassword = await bcrypt.hash(password, 10);

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
    res.json({ status: 500 });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, curTime } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ status: 404, message: "incorrect data" });
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    await User.updateOne({ email }, { $set: { lastLoginTime: curTime } });
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "UK1S9NwqY3aXPxXUuD8YMm3sZQmt6zxC"
      );

      return res.json({ status: 200, user: token });
    }
  } catch (e) {
    res.json({ status: 500 });
  }
});

app.post("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const { email } = jwt.verify(token, "UK1S9NwqY3aXPxXUuD8YMm3sZQmt6zxC");
    const users = await User.find({}, { password: 0, __v: 0 });
    const currentUser = await User.findOne({ email });
    return res.json({ status: 200, users, currentUser });
  } catch (error) {
    res.json({ status: "498", error: "invalid token" });
  }
});
app.post("/dashboard/delete", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const toDeleteUsersEmails = req.body;
    const { email } = jwt.verify(token, "UK1S9NwqY3aXPxXUuD8YMm3sZQmt6zxC");
    await User.deleteMany({ email: { $in: toDeleteUsersEmails } });
    const users = await User.find();
    const userLogout = await User.findOne({ email });
    return res.json({ status: 200, users, userLogout });
  } catch (e) {
    res.json({ status: 500 });
  }
});
app.post("/dashboard/block", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const { email } = jwt.verify(token, "UK1S9NwqY3aXPxXUuD8YMm3sZQmt6zxC");
    const toDeleteUsersEmails = req.body;
    await User.updateMany(
      { email: { $in: toDeleteUsersEmails } },
      { blocked: true }
    );
    const users = await User.find();
    const { blocked } = await User.findOne({ email });
    return res.json({ status: 200, users, userLogout: blocked });
  } catch (e) {
    res.json({ status: 500 });
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
    return res.json({ status: 200, users });
  } catch (e) {
    res.json({ status: 500 });
  }
});
