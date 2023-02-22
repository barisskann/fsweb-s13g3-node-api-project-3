const express = require("express");
const user = require("./users/users-router");
const server = express();

server.use(express.json());

server.use(user);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
