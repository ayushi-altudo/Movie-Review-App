import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (filters) => {
    const { category, year } = filters;
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=mission&type=${category}&y=${year}`
    );

    return response.data;
  }
);

export const fetchAsyncSearchedMovies = createAsyncThunk(
  "movies/fetchAsyncSearchedMovies",
  async (filters) => {
    const { term, category, year } = filters;
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=${category}&y=${year}`
    );

    return response.data;
  }
);

export const fetchAsyncMovieDetail = createAsyncThunk(
  "movies/fetchAsyncMovieDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);

    return response.data;
  }
);

const initialState = {
  movies: {},
  selectedMovie: {},
  searchedMovies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncMovieDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectedMovie: payload };
    },
    [fetchAsyncSearchedMovies.fulfilled]: (state, { payload }) => {
      console.log("Searched Successfully!");
      return { ...state, searchedMovies: payload };
    },
  },
});

export const { removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const getSearchedMovies = (state) => state.movies.searchedMovies;
export default movieSlice.reducer;
