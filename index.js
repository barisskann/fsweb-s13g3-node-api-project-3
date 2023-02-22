const express = require("express");
const app = express();
const userRouter = require("./api/server");
app.use(express.json());
app.use(userRouter);
app.listen(5000, (req, res) => {
  console.log("PORTA BAGLANILDI 5000");
});
