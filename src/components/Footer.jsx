import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const Footer = () => {
  const footerLinks = [
    "Audio Description",
    "Help Center",
    "Gift Cards",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ]

  const socialIcons = [
    { name: "Facebook", icon: "bi-facebook" },
    { name: "Instagram", icon: "bi-instagram" },
    { name: "Twitter", icon: "bi-twitter-x" },
    { name: "Youtube", icon: "bi-youtube" },
  ]

  return (
    <footer className="py-5 mt-5 border-top border-secondary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            {/* Social Icons */}
            <div className="d-flex gap-3 mb-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-secondary fs-5"
                  title={social.name}
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>

            {/* Footer Links */}
            <Row className="g-2 mb-4">
              {footerLinks.map((link, index) => (
                <Col xs={6} sm={4} md={3} key={index}>
                  <a href="#" className="footer-link">
                    {link}
                  </a>
                </Col>
              ))}
            </Row>

            {/* Service Button */}
            <Button variant="outline-secondary" size="sm" className="mb-3">
              Service Code
            </Button>

            {/* Copyright */}
            <p className="text-secondary small mb-0">
              © 1997-2024 Epiflix, Inc.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
