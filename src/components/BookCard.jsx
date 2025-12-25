const BookCard = ({ book }) => {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'><rect width='100%' height='100%' fill='%23e6e7e9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, Helvetica, sans-serif' font-size='28'>No Cover</text></svg>`
  )}`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow hover:scale-[1.02] transition overflow-hidden h-96 flex flex-col">
      <div className="h-2/3 bg-zinc-200 dark:bg-zinc-800">
        <img
          src={cover || placeholder}
          alt={cover ? book.title : "No cover available"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold line-clamp-2">{book.title}</h3>

          <p className="text-sm text-zinc-500">
            {book.author_name?.[0] || "Unknown Author"}
          </p>

          <p className="text-xs text-zinc-400">
            {book.first_publish_year || "—"}
          </p>
        </div>

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
