import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("science");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <input
      className="w-full p-3 rounded-lg border dark:bg-zinc-900"
      placeholder="Search books..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
