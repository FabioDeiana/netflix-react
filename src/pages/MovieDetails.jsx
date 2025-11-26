import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"

const MovieDetails = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentsError, setCommentsError] = useState(null)

  // Fetch movie details from OMDB
  const fetchMovieDetails = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=26d4dea4&plot=full`
      )

      if (!res.ok) {
        throw new Error("Errore di connessione al server")
      }

      const data = await res.json()

      if (data.Error) {
        throw new Error(data.Error)
      }

      if (data.Response === "False") {
        throw new Error("Film non trovato")
      }

      setMovie(data)
    } catch (err) {
      console.error("Errore caricamento film:", err)
      setError(err.message || "Errore nel caricamento del film")
    } finally {
      setLoading(false)
    }
  }

  // Fetch comments from API
  const fetchComments = async () => {
    setCommentsLoading(true)
    setCommentsError(null)

    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${movieId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk4MjE3MjczNjJkZjAwMTVkZWNiZTgiLCJpYXQiOjE3MzgwMzM1MjIsImV4cCI6MTczOTI0MzEyMn0.HGMq_NhW6-XQ7uYvkKo19_qx8j3_3qCZOvpMqJ1uCVg",
          },
        }
      )

      if (!res.ok) {
        throw new Error(`Errore ${res.status}: impossibile caricare i commenti`)
      }

      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Errore caricamento commenti:", err)
      setCommentsError(err.message || "Errore nel caricamento dei commenti")
    } finally {
      setCommentsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovieDetails()
    fetchComments()
  }, [movieId])

  // Loading state
  if (loading) {
    return <Loader text="Caricamento dettagli film..." fullScreen />
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => {
          fetchMovieDetails()
          fetchComments()
        }}
        showHomeButton
        fullScreen
      />
    )
  }

  if (!movie) return null

  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450/333/fff?text=No+Image"

  return (
    <div className="min-vh-100 bg-dark" style={{ paddingTop: "80px" }}>
      {/* Hero Section */}
      <div
        className="position-relative"
        style={{
          background: `linear-gradient(to bottom, rgba(20,20,20,0.7) 0%, #141414 100%),
                       url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}
      >
        <Container fluid className="px-4 px-md-5 py-5 position-relative">
          <Button
            variant="outline-light"
            size="sm"
            className="mb-3"
            onClick={() => navigate(-1)}
          >
            ← Indietro
          </Button>
        </Container>
      </div>

      <Container fluid className="px-4 px-md-5 py-4">
        <Row>
          {/* Movie Details */}
          <Col lg={8}>
            <div className="mb-4">
              <h1 className="display-4 fw-bold text-white mb-3">
                {movie.Title}
              </h1>

              <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
                <span className="text-success fw-bold fs-5">
                  ⭐ {movie.imdbRating}/10
                </span>
                <span className="text-white-50">{movie.Year}</span>
                <span className="text-white border border-white px-2 py-1 small">
                  {movie.Rated}
                </span>
                <span className="text-white-50">{movie.Runtime}</span>
              </div>

              <div className="mb-4">
                <span className="text-white-50 me-2">Genre:</span>
                <span className="text-white">{movie.Genre}</span>
              </div>

              <div className="mb-4">
                <span className="text-white-50 me-2">Director:</span>
                <span className="text-white">{movie.Director}</span>
              </div>

              <div className="mb-4">
                <span className="text-white-50 me-2">Cast:</span>
                <span className="text-white">{movie.Actors}</span>
              </div>

              <div className="mb-4">
                <h3 className="h5 text-white fw-bold mb-2">Trama</h3>
                <p className="text-white-50 fs-6">{movie.Plot}</p>
              </div>

              {movie.Awards !== "N/A" && (
                <div className="mb-4">
                  <span className="text-white-50 me-2">🏆 Awards:</span>
                  <span className="text-white">{movie.Awards}</span>
                </div>
              )}

              <div className="d-flex gap-3">
                <Button variant="light" size="lg" className="fw-semibold px-4">
                  <i className="bi bi-play-fill me-2"></i> Play
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="fw-semibold px-4"
                >
                  <i className="bi bi-plus-lg me-2"></i> My List
                </Button>
              </div>
            </div>
          </Col>

          {/* Poster */}
          <Col lg={4} className="d-none d-lg-block">
            <img
              src={posterUrl}
              alt={movie.Title}
              className="img-fluid rounded shadow-lg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        {/* Comments Section */}
        <Row className="mt-5">
          <Col lg={8}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="h3 text-white fw-bold mb-0">
                💬 Commenti {!commentsLoading && `(${comments.length})`}
              </h2>
              {commentsError && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={fetchComments}
                >
                  🔄 Ricarica
                </Button>
              )}
            </div>

            {commentsLoading ? (
              <Loader text="Caricamento commenti..." size="sm" />
            ) : commentsError ? (
              <ErrorMessage message={commentsError} onRetry={fetchComments} />
            ) : comments.length === 0 ? (
              <div className="text-center py-5 bg-secondary bg-opacity-10 rounded">
                <p className="text-white-50 mb-0">
                  📭 Nessun commento ancora. Sii il primo a commentare!
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {comments.map((comment) => (
                  <Card
                    key={comment._id}
                    bg="dark"
                    text="white"
                    className="border-secondary"
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span className="text-warning me-2">
                            {"⭐".repeat(comment.rate)}
                            <span className="text-white-50">
                              {"☆".repeat(5 - comment.rate)}
                            </span>
                          </span>
                          <Badge bg="secondary" className="ms-2">
                            {comment.rate}/5
                          </Badge>
                        </div>
                        <small className="text-white-50">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "it-IT",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </small>
                      </div>
                      <p className="mb-2">{comment.comment}</p>
                      <small className="text-white-50">
                        <i className="bi bi-person-circle me-1"></i>
                        {comment.author}
                      </small>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MovieDetails
