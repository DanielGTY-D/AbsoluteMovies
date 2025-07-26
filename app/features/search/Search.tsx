import React, { useState } from "react";
import { Form, useNavigate } from "react-router";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.length) return;

    navigate(`/searchlist/${query}/1`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-rose-800 py-1 px-2 rounded-sm">
          <label htmlFor="search" className="text-white "></label>
          <input
            type="text"
            id="search"
            name="query"
            className="w-auto h-auto placeholder:text-white outline-none bg-rose-800 text-white"
            placeholder="type to search"
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
};

export default Search;
