const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM empresas", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM empresas WHERE id=?",
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

router.post("/registrar-empresa", (req, res) => {
  const { id, name, description, addres, phone, email } = req.body;
  if (id) {
  } else {
    const password = "123456"
    mysqlConnection.query(
      "INSERT INTO empresas (name, description,  phone, addres, email, password) VALUES (?,?,?,?,?,?)",
      [name, description, phone, addres, email, password], (err, rows, fields) => {
        if(!err){
          res.status(200).json({exito: true});
        }else{
          res.status(405).json({exito: false, error: err})
        }
      }
    );
  }
});

module.exports = router;
