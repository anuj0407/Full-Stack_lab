const API_URL = "http://localhost:5000/api";

export const fetchBooks = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.title) queryParams.append("title", params.title);
  if (params.author) queryParams.append("author", params.author);
  if (params.genre) queryParams.append("genre", params.genre);

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  try {
    const response = await fetch(`${API_URL}/books${queryString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to create book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error("Failed to update book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
