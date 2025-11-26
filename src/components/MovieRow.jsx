import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import MovieCard from "./MovieCard"
import ErrorMessage from "./ErrorMessage"

const MovieRow = ({ title, imdbIds }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    setLoading(true)
    setError(null)

    try {
      const responses = await Promise.all(
        imdbIds.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=26d4dea4&plot=short`)
            .then((res) => {
              if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`)
              return res.json()
            })
            .then((data) => {
              if (data.Error) throw new Error(data.Error)
              if (data.Response === "False") throw new Error("Film non trovato")
              return data
            })
        )
      )
      setMovies(responses)
    } catch (err) {
      console.error(`Errore caricamento ${title}:`, err)
      setError(err.message || "Errore nel caricamento dei film")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [imdbIds])

  // Error state
  if (error) {
    return (
      <div className="mb-4 mb-md-5">
        <h2 className="h4 text-light fw-bold mb-3">{title}</h2>
        <ErrorMessage message={error} onRetry={fetchMovies} />
      </div>
    )
  }

  return (
    <div className="mb-4 mb-md-5">
      <h2 className="h4 text-light fw-bold mb-3">{title}</h2>
      <Row className="g-2 g-md-3">
        {loading
          ? // Skeleton loader
            Array(6)
              .fill(0)
              .map((_, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2}>
                  <div className="movie-card-skeleton bg-secondary rounded"></div>
                </Col>
              ))
          : movies.map((movie, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <MovieCard movie={movie} />
              </Col>
            ))}
      </Row>
    </div>
  )
}

export default MovieRow
