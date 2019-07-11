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
    managerMenu();
});

var managerMenu = function () {
    inquirer.prompt({
        name: "action",
        message: "What would you like to do today?",
        type: "list",
        choice: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
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

function viewAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        managerMenu();
    })
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, data) {
        if (err) throw err;
        console.table(data)
        managerMenu();
    });
};

function addInventory() {

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
                    return "Please put a number for how many item's you would like to stock."
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


// If Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store




