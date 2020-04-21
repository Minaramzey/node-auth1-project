const db = require("../db-config");

module.exports = {
  find,
  add,
  findById,
  findBy
};

function find() {
  return db("users").select("id", "username", "password");
}

function findById(id) {
  return (
    db("users")
      .where({ id })
      .select("id", "username")
      .first()
  );
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findBy(id) {
  return db("users").where(id);
}