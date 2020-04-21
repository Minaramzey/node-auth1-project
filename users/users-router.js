const router = require("express").Router();

const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding users" });
    });
});


module.exports = router;