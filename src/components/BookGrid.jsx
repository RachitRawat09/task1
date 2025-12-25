import BookCard from "./BookCard";

const BookGrid = ({ books = [] }) => {
  return (
    <div
      className="grid gap-6 p-4
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5"
    >
      {books.map((book, i) => (
        <div key={book.key ?? `${book.cover_i}-${i}`} className="p-0">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
