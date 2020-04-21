const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 8);
  userInfo.password = hash;
  Users.add(userInfo)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username
        };
        res.status(200).json({ hello: user.username, yourCookie: req.session });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding user" });
    });
});

module.exports = router;