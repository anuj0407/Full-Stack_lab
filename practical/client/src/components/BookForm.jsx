import React, { useState, useEffect } from "react";

const BookForm = ({ initialData, onSubmit, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedOn: "",
    genre: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format date for date input (YYYY-MM-DD)
      const formattedDate = initialData.publishedOn
        ? new Date(initialData.publishedOn).toISOString().split("T")[0]
        : "";

      setFormData({
        ...initialData,
        publishedOn: formattedDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseFloat(value) || "" : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publishedOn)
      newErrors.publishedOn = "Published date is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";
    if (formData.rating === "" || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      // Only reset if not editing
      if (!isEditing) {
        setFormData({
          title: "",
          author: "",
          publishedOn: "",
          genre: "",
          rating: "",
        });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.author ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Published Date
          </label>
          <input
            type="date"
            name="publishedOn"
            value={formData.publishedOn}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.publishedOn ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.publishedOn && (
            <p className="text-red-500 text-sm mt-1">{errors.publishedOn}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.genre ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.rating ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? "Update Book" : "Add Book"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;
