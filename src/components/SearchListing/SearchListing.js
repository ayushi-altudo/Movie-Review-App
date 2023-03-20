import React from "react";
import { useSelector } from "react-redux";
import { getSearchedMovies } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieListing/MovieListing.scss";

const SearchListing = (term) => {
  console.log(term, "term");
  const movies = useSelector(getSearchedMovies);
  let renderMovies = "";
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Search results for '{term.term}'</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
    </div>
  );
};

export default SearchListing;
