const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  // Use Object.values() to get an array of book objects from the books object
  let booksArray = Object.values(books);

  // Use the filter() method to find books with matching author
  let filteredBooks = booksArray.filter((book) => book.author === author);

  res.send(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let titleArray = Object.values(books);
  let filteredTitles = titleArray.filter((book) => book.title === title);

  res.send(filteredTitles);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].review);
});

// TASK 10 - Get the book list available in the shop using promises
public_users.get('/books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

    get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// TASK 11 - Get book details based on ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
    });

    get_books.then(() => console.log("Promise for Task 11 resolved"));
});

// TASK 12 - Get book details based on author
public_users.get('/books/author/:author',function (req, res) {
    const author = req.params.author;
    let booksArray = Object.values(books);
    let filteredBooks = booksArray.filter((book) => book.author === author);

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(filteredBooks));
    });

    get_books.then(() => console.log("Promise for Task 12 resolved"));
});

// TASK 13 - Get book details based on title
public_users.get('/books/author/:author',function (req, res) {
    const title = req.params.title;
    let titleArray = Object.values(books);
    let filteredTitles = titleArray.filter((book) => book.title === title);
    
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(filteredTitles));
    });

    get_books.then(() => console.log("Promise for Task 13 resolved"));
});

module.exports.general = public_users;
