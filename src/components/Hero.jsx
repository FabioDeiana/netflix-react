import React from "react"
import { Container, Row, Col, Button, Spinner } from "react-bootstrap"

const Hero = ({ movie, loading, error, onRetry }) => {
  // Loading state
  if (loading) {
    return (
      <div
        className="hero d-flex align-items-center justify-content-center bg-dark"
        style={{ marginTop: "56px" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="danger" className="mb-3" />
          <p className="text-white-50">Caricamento film in evidenza...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div
        className="hero d-flex align-items-center justify-content-center bg-dark"
        style={{ marginTop: "56px" }}
      >
        <div className="text-center">
          <p className="text-danger mb-3">⚠️ {error}</p>
          {onRetry && (
            <Button variant="outline-danger" size="sm" onClick={onRetry}>
              🔄 Riprova
            </Button>
          )}
        </div>
      </div>
    )
  }

  // No movie
  if (!movie) return null

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to right, #141414 0%, rgba(20,20,20,0.9) 30%, rgba(20,20,20,0.5) 60%, transparent 100%),
                          linear-gradient(to top, #141414 0%, #141414 20%, transparent 80%),
                          url(${movie.Poster})`,
        marginTop: "56px",
      }}
    >
      <Container
        fluid
        className="position-relative h-100 px-4 px-md-5"
        style={{ zIndex: 2 }}
      >
        <Row className="h-100 align-items-center py-5">
          <Col xs={12} md={8} lg={6} xl={5}>
            <h1 className="display-5 display-md-4 fw-bold text-white text-shadow mb-3">
              {movie.Title}
            </h1>
            <p className="text-white d-none d-md-block mb-3">
              {movie.Plot?.substring(0, 200)}...
            </p>
            <div className="d-flex flex-wrap gap-2 gap-md-3 mb-3 align-items-center">
              <span className="hero-rating fw-bold">{movie.imdbRating}/10</span>
              <span className="text-white">{movie.Year}</span>
              <span className="hero-rated text-white">{movie.Rated}</span>
              <span className="text-white d-none d-sm-inline">
                {movie.Runtime}
              </span>
            </div>
            <div className="d-flex gap-2 gap-md-3">
              <Button variant="light" className="fw-semibold px-3 px-md-4">
                <i className="bi bi-play-fill me-1"></i> Play
              </Button>
              <Button variant="secondary" className="fw-semibold px-3 px-md-4">
                <i className="bi bi-info-circle me-1"></i> More Info
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
