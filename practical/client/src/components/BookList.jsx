import React from "react";
import BookItem from "./BookItem";
import Loading from "./Loading";

const BookList = ({
  books,
  loading,
  onEdit,
  onDelete,
  searchTerm,
  filterGenre,
}) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b">
        Book List ({books.length})
      </h2>
      {books.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Published</th>
                <th className="px-4 py-2 text-left">Genre</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookItem
                  key={book._id}
                  book={book}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          {searchTerm || filterGenre
            ? "No books match your search criteria."
            : "No books available. Add some books!"}
        </div>
      )}
    </div>
  );
};

export default BookList;
