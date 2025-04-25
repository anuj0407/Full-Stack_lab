import React from "react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  genres,
  filterGenre,
  setFilterGenre,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
