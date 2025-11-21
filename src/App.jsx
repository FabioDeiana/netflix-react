import React, { useState, useEffect } from "react"
import { Container, Spinner, Alert, Button } from "react-bootstrap"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import MovieRow from "./components/MovieRow"
import { MOVIE_COLLECTIONS } from "./constants/movieCollections"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

export default function App() {
  const [heroMovie, setHeroMovie] = useState(null)
  const [heroLoading, setHeroLoading] = useState(true)
  const [heroError, setHeroError] = useState(null)

  const fetchHeroMovie = async () => {
    setHeroLoading(true)
    setHeroError(null)

    try {
      const res = await fetch(
        "https://www.omdbapi.com/?i=tt0241527&apikey=26d4dea4&plot=full"
      )

      if (!res.ok) {
        throw new Error("Errore di connessione")
      }

      const data = await res.json()

      if (data.Error) {
        throw new Error(data.Error)
      }

      setHeroMovie(data)
    } catch (err) {
      setHeroError(err.message || "Errore nel caricamento")
    } finally {
      setHeroLoading(false)
    }
  }

  useEffect(() => {
    fetchHeroMovie()
  }, [])

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />

      <Hero
        movie={heroMovie}
        loading={heroLoading}
        error={heroError}
        onRetry={fetchHeroMovie}
      />

      <Container
        fluid
        className="px-4 px-md-5 pt-4 pt-md-5 position-relative"
        style={{ zIndex: 10, marginTop: "-50px" }}
      >
        {MOVIE_COLLECTIONS.map((collection, index) => (
          <MovieRow
            key={index}
            title={collection.title}
            imdbIds={collection.imdbIds}
          />
        ))}
      </Container>

      <Footer />
    </div>
  )
}
