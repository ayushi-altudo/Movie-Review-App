import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchAsyncSearchedMovies } from "../../features/movies/movieSlice";
import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const category = "movie";

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term");

    setSearchParams({ search: term });
    console.log(searchParams, "ayushi");
    dispatch(fetchAsyncSearchedMovies({ term, category }));
    setTerm("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>

      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search..."
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
