var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root9",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    start();
});

var start = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            // ask what product they want to buy and how many
            {
                name: "product",
                type: "list",
                message: "What would you like to buy today?",
                choices: function (item) {
                    var productArr = [];
                    for (var i = 0; i < res.length; i++) {
                        productArr.push(res[i].product_name);
                    }
                    return productArr;
                }
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                //function to validate that it's a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return console.log("Please put in a number.");
                    }
                }
            }
        ]).then(function (answers) {

            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answers.product) {
                    var chosenItem = res[i];
                }
            }
            connection.query("SELECT stock_quantity FROM products WHERE ?", {product_name: chosenItem}, function (err, res){
                if (res.stock_quantity <= parseInt(answers.quantity)) {
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (stock_quantity -= answers.quantity)
                    }, {
                        product_name: chosenItem
                    }], function (err, res) {
                        if (err) throw err;
                        console.log("TOTAL NEEDED");
                    });
                } else {
                    console.log("We don't have that much in stock! Try a lower number please");
                }
            })

        })
            // check if inventory is enough for order 
            // if not, alert the user and prevent the order 
            // otherwise, allow the order and update the SQL database inventory
            // alert the total purchase price to customer
        });
}
