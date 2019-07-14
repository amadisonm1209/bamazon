# BAMAZON, a CLI one-stop coffee shop

## Bamazon Customer Side 

**Upon opening bamazon in your terminal like such (node bamazonCustomer.js), you'll be asked:**

* What product from the list you would like to purchase today 
* How many units of the product you would like to purchase 

**Bamazon will then do the following:**

* Will check the stock quantity of the item in question and make sure there is enough to fulfill your order
* If not, you will be asked to choose a different transaction 
* If there is enough stock, you will then be shown your total purchase price and asked if that will be all for you today
* Will also update the database to show the new stock quantity

![](/gifs/buy2chemex.gif)
![](/gifs/toomuch.gif)
![](/gifs/mySqlUpdate.gif)

## Bamazon Manager Side 

**Upon opening bamazon in your terminal like such (node bamazonManager.js), you'll be asked:**

* What action from the list below you would like to perform today
    * View products for sale 
    * View low inventory 
    * Add to inventory
    * Add new product


**Bamazon will then do the following:**

*View products for sale* --
The app will list all the products for sale in a table format

![](/gifs/viewallproducts.gif)

*View low inventory* --
The app will list all products with less than 5 stocked -- 
    *Notice the amount of scales in this example is 1, we will update that one in the next step.
    ![](/gifs/lowinventory.gif)


*Add to inventory* --
The app will ask what item you would like to add inventory for and will update the database to show the new amounts
![](/gifs/addinventory.gif)


*Add new product* --
The app will ask what new item you would like to add, including it's name, department name, price and stock quantity and will then update the database to show the new item 
    *In this example, let's add a new ceramic coffee mug.
![](/gifs/addnewitem.gif)


### Technologies Used
NodeJS, JavaScript, MySQL, Inquirer, Bash

### To Get Started Using Bamazon
Clone this repository and navigate to the bamazon file in your Terminal or Bash! Using Node and the applicable .js file (bamazonCustomer.js or bamazonManager.js) and get to shopping and stocking!




