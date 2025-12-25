export const fetchBooks = async ({ pageParam = 1, query }) => {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${query}&page=${pageParam}&limit=20`
  );

  if (!res.ok) throw new Error("Failed to fetch books");

  return res.json();
};
