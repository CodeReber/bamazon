var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletab = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1trtAll46",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
}
function start() {
  inquirer
    .prompt([{
      name: "bamazonId",
      type: "input",
      message: "What is the ID number of the product you want to buy?",
    },
    {
      name: "bamazonunit",
      type: "input",
      message: "How many units of the product do you want?"
    }
  ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE ?",
        {
          id: parseInt(answer.bamazonId)
        },

        function(err, res) {
          // if (err){console.log(err)}
          // console.log(res);
          if (res[0].stock_quantity >= answer.bamazonunit){
            var curramount = res[0].stock_quantity;
            var anwamount = parseInt(answer.bamazonunit);
            var idnum = answer.bamazonId;
            var price = parseFloat(res[0].price);
            var total = (price * anwamount).toFixed(2);
            makeSale(curramount,anwamount,idnum);
            // console.log(res[0].price * answer.bamazoneunit);
            // afterConnection();
            console.log("The total cost of your purchase is " + "$" + total);
            connection.end();
          }else{console.log("Insufficient quantity!")
            connection.end();
        }
          

        });
      
      

      // based on their answer, either call the bid or the post functions

    });

  }

  function makeSale(curramount,anwamount,idnum){
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: curramount - anwamount
        },
        {
          id: idnum 
        }
      ],
      function(err, res) {
        // console.log(res);
      }
    );
  }

  // function calcBill(){
  //   connection.query(
  //     "UPDATE products SET ? WHERE ?",
  //     [
  //       {
  //         stock_quantity: curramount - anwamount
  //       },
  //       {
  //         id: idnum 
  //       }
  //     ],
  //     function(err, res) {
  //       // console.log(res);
  //     }
  //   );
  // }