import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import Hero from "../components/Hero"
import MovieRow from "../components/MovieRow"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import { MOVIE_COLLECTIONS } from "../constants/movieCollections"

const Home = () => {
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
        throw new Error("Errore di connessione al server")
      }

      const data = await res.json()

      if (data.Error) {
        throw new Error(data.Error)
      }

      if (data.Response === "False") {
        throw new Error("Film non trovato")
      }

      setHeroMovie(data)
    } catch (err) {
      console.error("Errore caricamento hero:", err)
      setHeroError(err.message || "Errore nel caricamento del film in evidenza")
    } finally {
      setHeroLoading(false)
    }
  }

  useEffect(() => {
    fetchHeroMovie()
  }, [])

  return (
    <>
      <Hero
        movie={heroMovie}
        loading={heroLoading}
        error={heroError}
        onRetry={fetchHeroMovie}
      />

      <Container
        fluid
        className="px-4 px-md-5 pt-4 pt-md-5 position-relative"
        style={{ zIndex: 10, marginTop: "-200px" }}
      >
        {MOVIE_COLLECTIONS.map((collection, index) => (
          <MovieRow
            key={index}
            title={collection.title}
            imdbIds={collection.imdbIds}
          />
        ))}
      </Container>
    </>
  )
}

export default Home
