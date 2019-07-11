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
            // check if inventory is enough for order 
            connection.query("SELECT stock_quantity, price FROM products WHERE ?", { product_name: chosenItem.product_name }, function (err, data) {
                if (err) throw err;

                if (chosenItem.stock_quantity >= parseInt(answers.quantity)) {
                    //update database with new stock quantity 
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (chosenItem.stock_quantity -= answers.quantity)
                    }, {
                        product_name: chosenItem.product_name
                    }], function (err, res) {
                        if (err) throw err;
                        //total purchase price 
                        totalPrice(chosenItem.price, answers.quantity);

                    });
                } else {
                    // if not, alert the user and prevent the order 
                    console.log("We don't have that much in stock! Try a different purchase please.");
                    start();
                }
            })

        })

    });
}

var totalPrice = function (price, quantity) {
    var total = price * quantity;
    console.log(`Thanks for you purchase! Your total is: $${total}`);

    inquirer.prompt(
        // ask if that will be all for them today
        {
            name: "continue",
            type: "confirm",
            message: "Will that be all for you today?",
            default: true
    }).then (function(answer){
        if (answer.continue) {
            connection.end();
        } else{
            start();
        }
    });
}

