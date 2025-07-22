import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMoviesByQuery } from "../../services/movieService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginateComponent from "../ReactPaginate/ReactPaginate";

const errorNotify = () => {
  toast.error("No movies found for your request.");
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchQuery, setFetchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (query: string) => {
    setFetchQuery(query);
    setCurrentPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["moviesLists", fetchQuery, currentPage],
    queryFn: () => fetchMoviesByQuery(fetchQuery, currentPage),
    enabled: fetchQuery !== "",
    placeholderData: keepPreviousData,
  });

  const nbPages: number = data?.total_pages ?? 0;
  const movieList = data?.results;
  const movieLength = movieList?.length ?? 0;

  useEffect(() => {
    if (movieList) {
      if (movieLength === 0) {
        errorNotify();
        return;
      }
      setMovies(movieList);
    }
  }, [movieList, movieLength]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectedMovie = (movie: Movie) => {
    setIsOpen(true);
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={true} />
      {isSuccess && movieLength > 1 && (
        <ReactPaginateComponent
          total={nbPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieList && movieLength > 0 && (
        <MovieGrid onSelect={handleSelectedMovie} movies={movies} />
      )}
      {isOpen && (
        <MovieModal movie={selectedMovie!} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
