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

app.listen(process.env.PORT, () => {
  console.log(`Example app is listening at http://localhost:${port}`);
});
function getNewUserObject({ email, curTime, name }, password) {
  return {
    email,
    password,
    blocked: false,
    registrationTime: curTime,
    lastLoginTime: "-",
    name,
  };
}
app.post("/register", async (req, res) => {
  const user = await getUserByEmail(req.body);
  if (user) {
    return res.json({ status: 404, message: "email already taken" });
  }
  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create(getNewUserObject(req.body, newPassword));
    res.json({ status: 200, message: "user created" });
  } catch (e) {
    res.json({ status: 500 });
  }
});
async function getUserByEmail({ email }) {
  return await User.findOne({ email });
}
async function handleUserLogin(
  { password, email, curTime, name },
  passwordHash,
  res
) {
  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  await User.updateOne({ email: email }, { $set: { lastLoginTime: curTime } });
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: name,
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({ status: 200, user: token });
  }
}
app.post("/login", async (req, res) => {
  const user = await getUserByEmail(req.body);
  if (!user) {
    return res.json({ status: 404, message: "incorrect data" });
  }
  try {
    await handleUserLogin(req.body, user.password, res);
  } catch (e) {
    res.json({ status: 500 });
  }
});
app.post("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const users = await User.find({}, { password: 0, __v: 0 });
    const currentUser = await User.findOne({ email });
    return res.json({ status: 200, users, currentUser });
  } catch (error) {
    res.json({ status: "498", error: "invalid token" });
  }
});
async function deleteUsers(req, token, res) {
  const toDeleteUsersEmails = req.body;
  const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  await User.deleteMany({ email: { $in: toDeleteUsersEmails } });
  const users = await User.find();
  const userLogout = !(await User.findOne({ email }));
  return res.json({ status: 200, users, userLogout });
}
app.post("/dashboard/delete", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    await deleteUsers(req, token, res);
  } catch (e) {
    res.json({ status: 500 });
  }
});
async function blockUsers(req, token, res) {
  const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const toDeleteUsersEmails = req.body;
  await User.updateMany(
    { email: { $in: toDeleteUsersEmails } },
    { blocked: true }
  );
  const users = await User.find();
  const { blocked } = await User.findOne({ email });
  return res.json({ status: 200, users, userLogout: blocked });
}
app.post("/dashboard/block", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    await blockUsers(req, token, res);
  } catch (e) {
    res.json({ status: 500 });
  }
});

async function unblockUsers(req, res) {
  const toUnblockUsers = req.body;
  await User.updateMany({ email: { $in: toUnblockUsers } }, { blocked: false });
  const users = await User.find();
  return res.json({ status: 200, users });
}
app.post("/dashboard/unblock", async (req, res) => {
  try {
    await unblockUsers(req, res);
  } catch (e) {
    res.json({ status: 500 });
  }
});
