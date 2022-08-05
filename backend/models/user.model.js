const moongose = require("mongoose");
const User = new moongose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    registrationTime: {
      type: String,
      required: true,
    },
    lastLoginTime: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);
const model = moongose.model("UserData", User);
module.exports = model;
