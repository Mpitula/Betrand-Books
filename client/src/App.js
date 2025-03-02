import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  // Fetch books from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a new book
  const addBook = () => {
    axios
      .post("http://localhost:5000/api/books", newBook)
      .then((response) => {
        setBooks([...books, response.data]);
        setNewBook({ title: "", author: "", description: "" });
      })
      .catch((error) => console.error(error));
  };

  // Delete a book
  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <h1>Bookstore</h1>
      <div className="add-book">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book">
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <p>{book.description}</p>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
