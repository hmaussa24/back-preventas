const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  mysqlConnection.query(
    "SELECT users.name, users.phone, users.addres, users.email, users.image, users.empresaid, users.roll as idrol, users.id, roles.name as rolname FROM users, roles WHERE users.email=? AND users.password=? AND users.roll=roles.id",
    [email, password],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.status(200).json({
            name: rows[0].name,
            phone: rows[0].phone,
            addres: rows[0].addres,
            email: rows[0].email,
            rol: rows[0].rolname,
            image: rows[0].image,
            id: rows[0].id,
            idEmpresa: rows[0].empresaid,
            exito: true,
          });
        } else {
          res.status(200).json({ exito: false });
        }
      } else {
        res.status(405).json({ exito: false, error: err });
      }
    }
  );
});

router.post("/registrar-usuario", (req, res) => {
  const { name, phone, addres, email, password, rol, empresaid } = req.body;
  mysqlConnection.query(
    "INSERT INTO users (name,  phone, addres, email, password, roll, empresaid) VALUES (?,?,?,?,?,?,?)",
    [name, phone, addres, email, password, rol, empresaid],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({ exito: true });
      } else {
        res.status(405).json({ exito: false, error: err });
      }
    }
  );
});

router.get("/users?:empresaid", (req, res) => {
    const { empresaid } = req.query;
    mysqlConnection.query("SELECT users.name, users.phone, users.addres, users.email, users.image, users.empresaid, users.roll , users.id, roles.name as rol FROM users, roles WHERE empresaid=? AND users.roll=roles.id",[empresaid], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
  
  router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "SELECT * FROM users WHERE id=?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json(rows[0]);
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;
