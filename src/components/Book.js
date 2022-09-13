import PropTypes from "prop-types";

function Book({ imageURL, title, authors, book, updateBooks }) {
  function handleOption(e) {
    const value = e.target.value;
    updateBooks(book, value);
  }
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className={"book-cover"}
            style={{
              backgroundImage: imageURL ? `url(${imageURL.thumbnail})` : "none",
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf ? book.shelf : "none"}
              onChange={handleOption}
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>

        {authors &&
          authors.map((author, index) => {
            return (
              <div key={index} className="book-authors">
                {author}
              </div>
            );
          })}
      </div>
    </li>
  );
}
Book.propTypes = {
  imageURL: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  updateBooks: PropTypes.func.isRequired,
};
export default Book;
