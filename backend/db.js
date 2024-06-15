var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "santhosh@18",
  port: 3306,
  database: "node",
});

con.connect((error, response) => {
  if (error) {
    console.log("not connected");
  } else {
    console.log(`connected to database`);
  }
});

module.exports = con;
