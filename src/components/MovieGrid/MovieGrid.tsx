import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (id: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const handleClick = (movie: Movie) => {
    return onSelect(movie);
  };

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        return (
          <li
            onClick={() => {
              handleClick(movie);
            }}
            key={movie.id}
          >
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
