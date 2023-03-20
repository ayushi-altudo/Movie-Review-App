import React, { useState, useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import SearchListing from "../SearchListing/SearchListing";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncSearchedMovies,
} from "../../features/movies/movieSlice";
import { useSearchParams } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");
  const [year, setYear] = useState("");

  const [searchParams] = useSearchParams();
  var term = searchParams.get("search");
  console.log("Params", term);

  if (term !== null) {
    console.log("Search string found");
  } else console.log("not found");

  useEffect(() => {
    if (term !== null) {
      dispatch(fetchAsyncSearchedMovies({ term, category, year }));
    } else dispatch(fetchAsyncMovies({ category, year }));
  }, [dispatch, term, category, year]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="filters">
            <h3>Filters</h3>

            <form>
              <div>
                <h5>Categories</h5>
                <input
                  type="radio"
                  id="movie"
                  value="movie"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label for="movie">Movies</label>
                <br />
                <input
                  type="radio"
                  id="series"
                  value="series"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                />

                <label for="series">Shows</label>
              </div>

              <div className="range">
                <h5>Year of Release</h5>
                <input
                  type="range"
                  min="1980"
                  max="2022"
                  defaultValue={year}
                  className="slider"
                  id="myRange"
                  onChange={(e) => setYear(e.target.value)}
                />
                <span className="range-value">{year}</span>
              </div>
            </form>
          </div>
        </div>
        <div className="col-9">
          {term !== null ? (
            <SearchListing term={term} />
          ) : (
            <MovieListing category={category} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
