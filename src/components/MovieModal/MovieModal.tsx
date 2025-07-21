import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

//    id: number;
//     poster_path: string;
//     backdrop_path: string;
//     title: string;
//     overview: string;
//     release_date: string;
//     vote_average: number;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const closeModalByClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains("_backdrop_22elp_1")
      )
        onClose();
    };

    document.addEventListener("click", closeModalByClick);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", closeModalByClick);
    };
  }, [onClose]);

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}
