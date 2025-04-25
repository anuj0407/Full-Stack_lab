import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchFilter from "./components/SearchFilter";
import { fetchBooks, createBook, updateBook, deleteBook } from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  // Fetch books on component mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks();
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    getBooks();
  }, []);
  // Filter books when search or genre filter changes
  useEffect(() => {
    const filterBooks = () => {
      let result = [...books];

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          (book) =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term)
        );
      }

      if (filterGenre) {
        result = result.filter((book) => book.genre === filterGenre);
      }

      setFilteredBooks(result);
    };

    filterBooks();
  }, [books, searchTerm, filterGenre]);
  // Get unique genres from books
  const genres = [...new Set(books.map((book) => book.genre))].filter(Boolean);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (isEditing) {
        const updatedBook = await updateBook(currentBook._id, formData);
        setBooks(
          books.map((book) =>
            book._id === currentBook._id ? updatedBook : book
          )
        );
        setIsEditing(false);
        setCurrentBook(null);
      } else {
        const newBook = await createBook(formData);
        setBooks([...books, newBook]);
      }
      setLoading(false);
    } catch (err) {
      setError(isEditing ? "Failed to update book." : "Failed to create book.");
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true);
        await deleteBook(id);
        setBooks(books.filter((book) => book._id !== id));
        setLoading(false);
      } catch (err) {
        setError("Failed to delete book.");
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Book Management System
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={() => setError(null)} className="float-right">
            &times;
          </button>
        </div>
      )}

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genres={genres}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <BookForm
            initialData={currentBook}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            onCancel={handleCancel}
          />
        </div>
        <div className="w-full lg:w-2/3">
          <BookList
            books={filteredBooks}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            filterGenre={filterGenre}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
