import { useEffect, useRef, useState } from "react";
import { useInfiniteBooks } from "../hooks/useInfiniteBooks";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";
import SkeletonGrid from "../components/SkeletonGrid";

const Library = () => {
  const [query, setQuery] = useState("science");
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteBooks(query);

  const observerRef = useRef();

  const books = data?.pages.flatMap((page) => page.docs) || [];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white">
      <div className="p-4 sticky top-0 z-10 bg-inherit">
        <SearchBar onSearch={setQuery} />
      </div>

      {isLoading ? <SkeletonGrid /> : <BookGrid books={books} />}

      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default Library;
