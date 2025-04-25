const Book = require("../models/book.model");

// Create a new Book
exports.create = async (req, res) => {
  try {
    const { title, author, publishedOn, genre, rating } = req.body;

    // Create a new book
    const book = await Book.create({
      title,
      author,
      publishedOn,
      genre,
      rating,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Books
exports.findAll = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single Book
exports.findOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Book
exports.update = async (req, res) => {
  try {
    const { title, author, publishedOn, genre, rating } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.publishedOn = publishedOn || book.publishedOn;
    book.genre = genre || book.genre;
    book.rating = rating !== undefined ? rating : book.rating;

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a Book
exports.delete = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
