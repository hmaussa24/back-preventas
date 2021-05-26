const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/registrar-producto", (req, res) => {
  const { id, name, description, stock, sell_price, buy_price, empresaid } =
    req.body;
  if (id) {
  } else {
    mysqlConnection.query(
      "INSERT INTO productos (name, description,  stock, sell_price, buy_price, state, empresaid) VALUES (?,?,?,?,?,?,?)",
      [name, description, stock, sell_price, buy_price, 2, empresaid],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({ exito: true });
        } else {
          res.status(405).json({ exito: false, error: err });
        }
      }
    );
  }
});

router.post("/desabilitar-producto", (req, res) => {
  const { idProducto } = req.body;

  mysqlConnection.query(
    "UPDATE productos SET state=? WHERE id=?",
    [2, idProducto],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({ exito: true });
      } else {
        res.status(405).json({ exito: false, error: err });
      }
    }
  );
});


router.post("/eliminar-producto", (req, res) => {
  const { idProducto } = req.body;

  mysqlConnection.query(
    "UPDATE productos SET state=? WHERE id=?",
    [3, idProducto],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({ exito: true });
      } else {
        res.status(405).json({ exito: false, error: err });
      }
    }
  );
});

router.post("/habilitar-producto", (req, res) => {
  const { idProducto } = req.body;

  mysqlConnection.query(
    "UPDATE productos SET state=? WHERE id=?",
    [1, idProducto],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({ exito: true });
      } else {
        res.status(405).json({ exito: false, error: err });
      }
    }
  );
});

router.get("/productos?:empresaid", (req, res) => {
  const { empresaid } = req.query;
  mysqlConnection.query(
    "SELECT * FROM productos WHERE empresaid=? AND (state=1 OR state=2)",
    [empresaid],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/producto", (req, res) => {
  const { idProducto } = req.body;
  mysqlConnection.query(
    "SELECT * FROM productos WHERE id=?",
    [idProducto],
    (err, rows, fields) => {
      if (!err) {
        console.log(idProducto)
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
