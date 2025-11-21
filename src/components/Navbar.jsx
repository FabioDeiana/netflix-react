import React, { useState, useEffect } from "react"
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      variant="dark"
      className={`navbar-netflix py-2 ${scrolled ? "scrolled" : ""}`}
    >
      <Container fluid className="px-3 px-md-5">
        <BsNavbar.Brand href="#" className="epiflix-logo me-4">
          EPIFLIX
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="navbar-nav" />

        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto gap-1">
            <Nav.Link href="#" className="text-white fw-bold">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="text-white-50">
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
            <Nav.Link href="#" className="text-white p-1">
              🔍
            </Nav.Link>
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
