import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

function BookList({ AllBooks, updateBooks }) {
  let AllshelfesObject = {};
  AllBooks.forEach((shelf) => {
    const nameOfShlef = shelf.shelf;
    if (!AllshelfesObject[`${nameOfShlef}`]) {
      AllshelfesObject[`${nameOfShlef}`] = nameOfShlef;
    }
  });
  const bookscurrentlyReading = AllBooks.filter(
    (book) => book.shelf === AllshelfesObject.currentlyReading
  );
  const bookswantToRead = AllBooks.filter(
    (book) => book.shelf === AllshelfesObject.wantToRead
  );
  const booksread = AllBooks.filter(
    (book) => book.shelf === AllshelfesObject.read
  );

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              subtitle="currentlyReading"
              shelfTitle={AllshelfesObject.currentlyReading}
            >
              {bookscurrentlyReading.map((book) => {
                return (
                  <Book
                    updateBooks={updateBooks}
                    book={book}
                    key={book.id}
                    imageURL={book.imageLinks}
                    title={book.title}
                    authors={book.authors}
                  />
                );
              })}
            </Bookshelf>
            <Bookshelf
              subtitle="wantToRead"
              shelfTitle={AllshelfesObject.wantToRead}
            >
              {bookswantToRead.map((book) => {
                return (
                  <Book
                    updateBooks={updateBooks}
                    book={book}
                    key={book.id}
                    imageURL={book.imageLinks}
                    title={book.title}
                    authors={book.authors}
                  />
                );
              })}
            </Bookshelf>
            <Bookshelf subtitle="read" shelfTitle={AllshelfesObject.read}>
              {booksread.map((book) => {
                return (
                  <Book
                    updateBooks={updateBooks}
                    book={book}
                    key={book.id}
                    imageURL={book.imageLinks}
                    title={book.title}
                    authors={book.authors}
                  />
                );
              })}
            </Bookshelf>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}
BookList.propTypes = {
  AllBooks: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired,
};
export default BookList;
