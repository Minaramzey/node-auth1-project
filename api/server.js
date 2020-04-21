const express = require("express");

const session = require("express-session");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const restricted = require("../auth/authenticatorMW");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: "secret cookie stash ",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "running" });
});

module.exports = server;