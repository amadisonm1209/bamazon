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

![](gifs/spotify-this-song.gif)

## Bamazon Manager Side 

**Upon opening bamazon in your terminal like such (node bamazonManager.js), you'll be asked:**

* What action from the list below you would like to perform today
    * View products for sale 
    * View low inventory 
    * Add to inventory
    * Add new product


**Bamazon will then do the following:**

*View products for sale*
*The app will list all the products for sale in a table format

*View low inventory*
*The app will list all products with less than 5 stocked

*Add to inventory*
*The app will ask what item you would like to add inventory for
*It will update the database to show the new amounts

*Add new product*
*The app will ask what new item you would like to add, including it's name, department name, price and stock quantity
*It will then update the database to show the new item 

### Technologies Used
NodeJS, JavaScript, MySQL, Inquirer, Bash

### To Get Started Using Liri
Clone this repository and navigate to the bamazon file in your Terminal or Bash! Using Node and the applicable .js file (bamazonCustomer.js or bamazonManager.js) and get to shopping and stocking!

