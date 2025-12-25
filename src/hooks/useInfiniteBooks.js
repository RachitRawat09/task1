import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "../lib/openLibrary";

export const useInfiniteBooks = (query) => {
  return useInfiniteQuery({
    queryKey: ["books", query],
    queryFn: ({ pageParam }) =>
      fetchBooks({ pageParam, query }),
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * 20 < lastPage.numFound) {
        return pages.length + 1;
      }
      return undefined;
    },
  });
};
