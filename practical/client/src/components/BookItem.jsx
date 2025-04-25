import React from "react";

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{book.title}</td>
      <td className="px-4 py-3">{book.author}</td>
      <td className="px-4 py-3">
        {new Date(book.publishedOn).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">{book.genre}</td>
      <td className="px-4 py-3">{book.rating}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookItem;
