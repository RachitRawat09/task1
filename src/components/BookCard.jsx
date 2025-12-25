const BookCard = ({ book }) => {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow hover:scale-[1.02] transition overflow-hidden">
      
      <div className="aspect-[2/3] bg-zinc-200 dark:bg-zinc-800">
        {cover ? (
          <img
            src={cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            📘 No Cover
          </div>
        )}
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-bold line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-zinc-500">
          {book.author_name?.[0] || "Unknown Author"}
        </p>

        <p className="text-xs text-zinc-400">
          {book.first_publish_year || "—"}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {book.subject?.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
