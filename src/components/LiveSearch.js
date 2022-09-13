import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";
function LiveSearch({ onSearch, resultSearch, updateBooks }) {
  function handleSearch(value) {
    onSearch(value);
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {resultSearch &&
            !resultSearch.error &&
            resultSearch.map((book) => {
              return (
                <Book
                  book={book}
                  key={book.id}
                  imageURL={book.imageLinks}
                  title={book.title}
                  authors={book.authors}
                  updateBooks={updateBooks}
                />
              );
            })}
          {resultSearch && resultSearch.error && <h1>{resultSearch.error}</h1>}
        </ol>
      </div>
    </div>
  );
}
LiveSearch.propTypes = {
  updateBooks: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
export default LiveSearch;
