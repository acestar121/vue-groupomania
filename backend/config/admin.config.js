const Database = require("../models")
const bcrypt = require("bcrypt")

//ADMIN
//pseudo = Admin
//email = admin@groupomania.com
//password = Adminis1!

function createAdmin(req, res) {
  // check if an admin account already exists
  Database.User.findOne({
    where: { email: "admin@groupomania.com" } || { pseudo: "admin" },
  })
    .then((user) => {
      // if not create one
      if (!user) {
        bcrypt
          .hash("Adminis1", 10)
          .then((hash) => {
            const admin = Database.User.create({
              pseudo: "admin",
              email: "admin@groupomania.com",
              password: hash,
              isAdmin: true,
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `le compte administrateur est créé !`,
                })
              })
              .catch((error) => {
                res.status(400).json({ error })
              })
          })
          .catch((error) => {
            res.status(500).send({ error })
          })
      } else {
        console.log({ message: "le compte administrateur existe déjà !" })
      }
    })
    .catch((error) => {
      console.log({ error })
    })
}
module.exports = createAdmin()