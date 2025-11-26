import React from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450/333/fff?text=No+Image"

  const handleCardClick = () => {
    navigate(`/movie-details/${movie.imdbID}`)
  }

  return (
    <Card
      className="movie-card bg-transparent border-0 overflow-hidden rounded position-relative"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        src={posterUrl}
        alt={movie.Title}
        className="w-100"
        style={{ aspectRatio: "2/3", objectFit: "cover" }}
      />
      <div className="movie-card-overlay position-absolute bottom-0 start-0 end-0 p-2 pt-5">
        <div className="d-flex gap-1 mb-2">
          <button
            className="card-btn play"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            ▶
          </button>
          <button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            +
          </button>
          <button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            👍
          </button>
          <button
            className="card-btn ms-auto"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            ▼
          </button>
        </div>
        <h6 className="text-white small fw-bold mb-1 text-truncate">
          {movie.Title}
        </h6>
        <div className="d-flex align-items-center gap-2 small">
          <span className="card-rating fw-bold">{movie.imdbRating}</span>
          <span className="card-rated text-white">{movie.Rated}</span>
          <span className="text-white">{movie.Year}</span>
        </div>
        <div className="text-white-50 mt-1" style={{ fontSize: "0.65rem" }}>
          {movie.Genre?.split(", ").slice(0, 2).join(" • ")}
        </div>
      </div>
    </Card>
  )
}

export default MovieCard
