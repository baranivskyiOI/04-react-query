import axios from "axios";
const apiKey = import.meta.env.VITE_TMDB_TOKEN;
import type { Movie } from "../types/movie";

interface MoviesHTTPResponse {
  results: Movie[];
}

const fetchMovies = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchMoviesByQuery(query:string): Promise<Movie[]> {
        const response = await fetchMovies.get<MoviesHTTPResponse>(
        `/search/movie`,
        {
          params: {
            query,
          },
        }
  );
  
  return response.data.results;
}   
