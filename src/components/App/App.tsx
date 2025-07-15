import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMoviesByQuery } from "../../services/movieService";

const errorNotify = () => {
  toast.error("No movies found for your request.");
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const movieList: Movie[] = await fetchMoviesByQuery(query);

      if (!movieList.length) {
        errorNotify();
        setMovies([]);
        return;
      }

      setMovies(movieList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectedMovie = (movie: Movie) => {
    setIsOpen(true);
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={true} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelectedMovie} movies={movies} />
      )}
      {isOpen && (
        <MovieModal movie={selectedMovie!} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
