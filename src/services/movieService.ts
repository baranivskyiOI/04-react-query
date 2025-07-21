import axios from "axios";
const apiKey = import.meta.env.VITE_TMDB_TOKEN;
import type { Movie } from "../types/movie";

interface MoviesHTTPResponse {
  results: Movie[];
  total_pages: number;
}

const fetchMovies = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchMoviesByQuery(query: string, page: number): Promise<MoviesHTTPResponse> {
  
        const response = await fetchMovies.get<MoviesHTTPResponse>(
        `/search/movie`,
        {
          params: {
            query,
            page
          },
        }
  );
  
  return response.data;
}   
