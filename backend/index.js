const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
app.get("/test", (req, res) => {
  console.log("TEST");
  res.json({ respData: "connected" });
});
