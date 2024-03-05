let exp = require("express");

let app = exp();

let cors = require("cors");

app.use(cors());

app.use(exp.json());

let conn = require("./db");

app.post("/sqlstore", (req, res) => {
  console.log(req.body);

  res.json(req.body);

  conn.query(
    "CREATE TABLE IF NOT EXISTS ReactUsers (id INT NOT NULL , Email VARCHAR(20) NOT NULL, Password VARCHAR(10) NOT NULL, PRIMARY KEY (ID))"
  ),
    (err, data) => {
      if (err) {
        console.log("table not created!");
      } else {
        console.log("table  created");
      }
    };

  conn.query("INSERT INTO  ReactUsers SET ?", req.body, (er, info) => {
    if (er) {
      console.log("data not stored");
    } else {
      console.log("Data stored");
    }
  });
});

app.get("/mysqlusers", (req, res) => {
  conn.query("SELECT * FROM ReactUsers", (error, data) => {
    if (error) {
      res.send("Error in database");
    } else {
      res.send(data);
    }
  });
});

app.put("/edit/:id", (req, res) => {
  const { Email, Password } = req.body;
  const { id } = req.params;
  conn.query(
    "UPDATE ReactUsers SET Email=?, Password=? WHERE ID=?",
    [Email, Password, id],
    (er, data) => {
      if (er) {
        res.send(er);
      } else {
        res.send(data);
      }
    }
  );
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  conn.query("DELETE FROM ReactUsers WHERE ID = ?", [id], (error, data) => {
    if (error) {
      res.send("Error in database");
    } else {
      res.send(data);
    }
  });
});

app.listen(3030, () => {
  console.log("port 3030 and mysql using");
});
