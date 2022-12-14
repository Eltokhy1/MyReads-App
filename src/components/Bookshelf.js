import React from "react";

function Bookshelf({ shelfTitle, children, subtitle }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle ? shelfTitle : subtitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{children}</ol>
      </div>
    </div>
  );
}

export default Bookshelf;
