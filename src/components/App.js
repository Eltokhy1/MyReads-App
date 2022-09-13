import "../App.css";
import { useEffect, useState } from "react";
import * as BookAPI from "../utils/BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import LiveSearch from "./LiveSearch";
function App() {
  const [AllBooks, setAllBooks] = useState([]);
  const [IdToBook, setIdToBook] = useState(new Map());
  const [Query, setQuery] = useState("");
  const [resultSearch, setResultSearch] = useState(null);
  const [finalDataOfSearch, setfinalDataOfSearch] = useState([]);

  const handleSearchData = (data) => {
    const map = new Map();
    if (data) {
      data.map((book) => {
        return map.set(book.id, book);
      });
    }
    return map;
  };

  useEffect(() => {
    const getAllData = async () => {
      let Data = await BookAPI.getAll();
      setAllBooks(Data);
      setIdToBook(handleSearchData(Data));
    };
    getAllData();
  }, []);

  useEffect(() => {
    if (Query) {
      const result = async () => {
        let data = await BookAPI.search(Query);
        setResultSearch(data);
      };
      result();
    } else if (Query === "") {
      setResultSearch([]);
    }
  }, [Query]);

  useEffect(() => {
    if (resultSearch && !resultSearch.error) {
      const result = resultSearch.map((book) => {
        if (IdToBook.has(book.id)) {
          return IdToBook.get(book.id);
        } else {
          return book;
        }
      });
      setfinalDataOfSearch(result);
    } else if (resultSearch && resultSearch.error) {
      setfinalDataOfSearch(resultSearch);
    }
  }, [resultSearch]);

  const updateBooks = (book, shelf) => {
    const result = AllBooks.map((b) => {
      if (b.id === book.id) {
        book.shelf = shelf;
        return book;
      }
      return b;
    });

    if (!IdToBook.has(book.id)) {
      book.shelf = shelf;
      result.push(book);
      IdToBook.set(book.id, book);
    }
    const update = async () => {
      await BookAPI.update(book, shelf);
    };
    setAllBooks(result);
    update();
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<BookList AllBooks={AllBooks} updateBooks={updateBooks} />}
          ></Route>
          <Route
            path="/search"
            element={
              <LiveSearch
                resultSearch={finalDataOfSearch}
                updateBooks={updateBooks}
                onSearch={setQuery}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
