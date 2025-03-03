// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParse = require("body-parser");

const app = express(); //This initializes an Express application.
const PORT = 5000; //This sets the port number on which the server will listen for incoming requests.

//Middleware
app.use(cors);
app.use(bodyParse.json());

//connect to MongoDb
mongoose
  .connect("mongodb://localhost:27017/bookstore")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connected to MongoDB");
});

//Defining the book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

const Book = mongoose.model("Book", bookSchema);

// Route
app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/api/books", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

app.delete("/api/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
