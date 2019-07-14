//DEPENDENCIES---------------------------------------
var inquirer = require("inquirer");
var mysql = require("mysql");

//CONNECTION VARIABLE--------------------------------
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
    managerMenu();
});

//MAIN MENU------------------------------------------
var managerMenu = function () {
    inquirer.prompt({
        name: "action",
        message: "What would you like to do today?",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }).then(function (answer) {

        switch (answer.action) {
            case "View Products for Sale":
                return viewAll();
            case "View Low Inventory":
                return viewLowInventory();
            case "Add to Inventory":
                return addInventory();
            case "Add New Product":
                return addProduct();
            default:
                connection.end();
        }
    })
}

//FUNCTIONS--------------------------------------

function viewAll() {
    connection.query("SELECT product_name, department_name, stock_quantity, price FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        managerMenu();
    })
};

function viewLowInventory() {
    connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5", function (err, data) {
        if (err) throw err;
        console.table(data)
        managerMenu();
    });
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, data){
        if (err) throw err;

        inquirer.prompt([
            {
                message: "What product would you like to stock?",
                name: "item",
                type: "list",
                choices: function (){
                    var items = data.map(function(item){
                        return item.product_name;
                    });

                    return items;
                }
            },{
                message: "How many would you like to add?",
                name: "amount",
                validate: function (input) {
                    if (isNaN(input) || parseInt(input)<1) {
                        return "Please put a number for how many items you would like to stock."
                    } return true;
                }
            }]).then(function(answers) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].product_name === answers.item) {
                        var chosenItem = data[i];
                    }
                }
                
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: (chosenItem.stock_quantity += parseInt(answers.amount))
            },{
                product_name: answers.item
            }], function (err){
                if (err) throw err;
                console.log(`Updated ${answers.item} inventory`)

                managerMenu();
            })
        })
        
    })
};

function addProduct() {
    //asks about the new product to add
    inquirer.prompt([
        {
            message: "What product would you like to add?",
            name: "item"
        }, {
            message: "What department does this item belong in?",
            name: "department"
        }, {
            message: "What is this item's price?",
            name: "price",
            validate: function (input) {
                if (isNaN(input)) {
                    return "Please enter a numeric price for the new item."
                } return true;
            }
        }, {
            message: "How many of these would you like to stock?",
            name: "stock",
            validate: function (input) {
                if (isNaN(input)) {
                    return "Please put a number for how many items you would like to stock."
                } return true;
            }
        }
    ]).then(function (answers) {
        //insert into database

        connection.query("INSERT INTO products SET ?", {
            product_name: answers.item,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.stock

        }, function (err) {
            if (err) throw err;

            console.log(`Added Your New Item: ${answers.item}`);
            managerMenu();
        })
    });

}






