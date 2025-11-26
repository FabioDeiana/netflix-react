import React, { useState, useEffect } from "react"
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  // Determina il placeholder in base alla route corrente
  const getSearchPlaceholder = () => {
    if (location.pathname === "/tv-shows") {
      return "Cerca Serie TV..."
    }
    return "Cerca Film..."
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Ricerca:", searchQuery)
      // Qui potresti implementare la logica di ricerca
      // navigate(`/search?q=${searchQuery}`)
    }
  }

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      variant="dark"
      className={`navbar-netflix py-2 ${scrolled ? "scrolled" : ""}`}
    >
      <Container fluid className="px-3 px-md-5">
        <BsNavbar.Brand as={Link} to="/" className="epiflix-logo me-4">
          EPIFLIX
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="navbar-nav" />

        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto gap-1">
            <Nav.Link
              as={Link}
              to="/"
              className={isActive("/") ? "text-white fw-bold" : "text-white-50"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/tv-shows"
              className={
                isActive("/tv-shows") ? "text-white fw-bold" : "text-white-50"
              }
            >
              TV Shows
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50">
              Movies
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50">
              New & Popular
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50 d-none d-xl-block">
              My List
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-3">
            {/* Search Bar */}
            {showSearch ? (
              <Form onSubmit={handleSearchSubmit} className="d-flex">
                <InputGroup size="sm" style={{ width: "200px" }}>
                  <Form.Control
                    type="text"
                    placeholder={getSearchPlaceholder()}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-dark text-white border-secondary"
                    style={{ fontSize: "0.9rem" }}
                  />
                  <InputGroup.Text
                    className="bg-dark border-secondary text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowSearch(false)
                      setSearchQuery("")
                    }}
                  >
                    ✕
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            ) : (
              <Nav.Link
                onClick={() => setShowSearch(true)}
                className="text-white p-1"
                style={{ cursor: "pointer" }}
              >
                🔍
              </Nav.Link>
            )}

            <Nav.Link href="#" className="text-white d-none d-md-block">
              Kids
            </Nav.Link>
            <Nav.Link href="#" className="text-white p-1">
              🔔
            </Nav.Link>
            <div
              className="rounded bg-danger d-none d-sm-block"
              style={{ width: "32px", height: "32px" }}
            ></div>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
