var mysql = require("mysql");
var inquirer = require("inquirer");
var confirm = require('inquirer-confirm');

 var connection = mysql.createConnection({
   host: "localhost",
   port: 8889,

//    Your username
   user: "root",

//   // Your password
   password: "root",
  database: "bamazon"
 });

 connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);
  
display();
   setTimeout(start, 1000);
 });

// //  connection.query("INSERT INTO songs SET ?", {
// //    title: "Human",
// //    artist: "Krewella",
// //    genre: "Dance"
// //  }, function(err, res) {});

// //  connection.query("UPDATE songs SET ? WHERE ?", [{
// //    title: "Human2",
// //  }, {
// //    flavor: "Rocky Road"
// //  }], function(err, res) {});

// //  connection.query("DELETE FROM songs WHERE ?", {
// //    flavor: "strawberry"
// //  }, function(err, res) {});

// // connection.query("SELECT * FROM products WHERE item_id=?" ,[likeToBuy], function(err,res){
// //   // if (err) throw err;
// //   // console.log(res);
// //   for (var i= 0; i < res.length; i++){
// //     console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
// //   }
// // });

 var display = function(){
 connection.query("SELECT * FROM products", function(err,res){
      if (err) throw err;
      for (var i= 0; i < res.length; i++){
       console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
     }
     //  console.log(res);
  });
 }

 var start = function(){
 inquirer.prompt([
     {
     type: "input",
     message: "What is the ID (1-10) of the product you would like to buy? ",
     name: "id",
     validate: function(value) {
         if (isNaN(value) === false){
             return true;
         }
         return false;
     }
 }, 
 {
     type: "input",
     message: "What is the number of units (of this ID) you would like to buy?",
     name: "quantity",
     validate: function(value) {
         if (isNaN(value) === false){
             return true;
         }
         return false;
     }, 
    
 },

 

// // ,{
// //     type: "confirm",
// //     message: "Do you want to inquire on another product?",
// //     name: "confirm",
// //     default: true 
// // }
 ]).then(function(answer){
     
    //  var evaluate;
     connection.query("SELECT stock_quantity FROM products WHERE ?", { 
         item_id: answer.id 
     }, function(err,res) {
         if (err) throw err;
         //console.log(res);
         if (res[0].stock_quantity === 300){
             console.log("Insufficient quantity!");
             return;
         }else{
              var newQuantity = (res[0].stock_quantity-answer.quantity);
             console.log(newQuantity);
connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newQuantity
    }, {
        item_id: answer.id
    }], function(err,res){
        //console.log(res);
        // console.log(answer.quantity);
    });


connection.query("SELECT * FROM products WHERE ?", { 
          item_id: answer.id 
      }, function(err,res) {
          if (err) throw err;
        //   console.log(res[0].price);
console.log("Your total cost for this product is: $" + answer.quantity*res[0].price);
    
 });
         }
    

    


        //   console.log(res[0]);
//          confirm('Do you want to inquire on another product?')
//    .then(function confirmed() {
//      display();
//     setTimeout(start, 1000);
//    }, function cancelled() {
//      connection.end(); 
//    });



     });
 });
 };




//connection.end(); 