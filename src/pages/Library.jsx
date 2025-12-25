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
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );
  const [showTop, setShowTop] = useState(false);

  const books = data?.pages.flatMap((page) => page.docs) || [];

  const quickFilters = ["science", "math", "history", "biology", "astronomy"];

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

  useEffect(() => {
    // apply theme on mount (ensure class matches stored state)
    const applyClass = (on) =>
      document.documentElement.classList.toggle("dark", on);

    const supportsClassDark = () => {
      try {
        for (const sheet of Array.from(document.styleSheets)) {
          try {
            for (const rule of Array.from(sheet.cssRules || [])) {
              if (rule.selectorText && rule.selectorText.includes(".dark"))
                return true;
            }
          } catch (e) {
            continue;
          }
        }
      } catch (e) {}
      return false;
    };

    const applyFallback = (on) => {
      const id = "force-dark-overrides";
      let el = document.getElementById(id);
      if (on) {
        if (!el) {
          el = document.createElement("style");
          el.id = id;
          el.innerHTML = `
            [data-theme="dark"] { background-color: #000 !important; color: #e6e6e6 !important; }
            [data-theme="dark"] .bg-white { background-color: #0b0b0b !important; }
            [data-theme="dark"] .bg-zinc-50 { background-color: #0b0b0b !important; }
            [data-theme="dark"] .bg-zinc-200 { background-color: #111 !important; }
            [data-theme="dark"] .bg-zinc-100 { background-color: #111 !important; }
            [data-theme="dark"] .text-black { color: #e6e6e6 !important; }
            [data-theme="dark"] .text-zinc-600 { color: #9ca3af !important; }
            [data-theme="dark"] .text-zinc-400 { color: #9ca3af !important; }
            [data-theme="dark"] .border { border-color: rgba(255,255,255,0.06) !important; }
          `;
          document.head.appendChild(el);
        }
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        if (el) el.remove();
        document.documentElement.removeAttribute("data-theme");
      }
    };

    const classMode = supportsClassDark();
    if (classMode) {
      applyClass(theme === "dark");
    } else {
      applyFallback(theme === "dark");
    }

    // also set body styles so full-page background updates immediately
    try {
      if (theme === "dark") {
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#e6e6e6";
      } else {
        document.body.style.backgroundColor = "#f8fafc";
        document.body.style.color = "#000000";
      }
    } catch (e) {}

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFilter = (q) => {
    setQuery(q);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    // apply immediately so UI updates even if effect timing differs
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      if (next === "dark") {
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#e6e6e6";
      } else {
        document.body.style.backgroundColor = "#f8fafc";
        document.body.style.color = "#000000";
      }
    } catch (e) {}
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* ignore */
    }
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white">
      <div className="p-4 sticky top-0 z-20 bg-inherit backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Book Explorer</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              discover books from open library
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-72">
              <SearchBar
                onSearch={(q) => {
                  setQuery(q);
                  window.scrollTo({ top: 0 });
                }}
              />
            </div>

            <div className="flex gap-2">
              {quickFilters.map((q) => (
                <button
                  key={q}
                  onClick={() => handleFilter(q)}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    q === query
                      ? "bg-zinc-900 text-white dark:bg-zinc-200 dark:text-black"
                      : "bg-white dark:bg-zinc-800 text-black dark:text-white"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="ml-3 px-3 py-1 rounded-md border"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 mt-4 max-w-6xl mx-auto block sm:hidden">
        <SearchBar
          onSearch={(q) => {
            setQuery(q);
            window.scrollTo({ top: 0 });
          }}
        />
      </div>

      <main className="max-w-6xl mx-auto">
        {isLoading ? <SkeletonGrid /> : <BookGrid books={books} />}

        <div ref={observerRef} className="h-10" />
      </main>

      {showTop && (
        <button
          onClick={backToTop}
          className="fixed right-6 bottom-6 z-50 p-3 rounded-full bg-zinc-900 text-white shadow-lg"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Library;
