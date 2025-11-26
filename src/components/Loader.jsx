import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = ({
  text = "Caricamento...",
  size = "md",
  fullScreen = false,
}) => {
  const spinnerSize = size === "sm" ? "sm" : size === "lg" ? "lg" : undefined

  if (fullScreen) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark"
        style={{ paddingTop: "80px" }}
      >
        <Spinner
          animation="border"
          variant="danger"
          size={spinnerSize}
          className="mb-3"
        />
        <p className="text-white-50">{text}</p>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner
        animation="border"
        variant="danger"
        size={spinnerSize}
        className="mb-3"
      />
      <span className="text-white-50">{text}</span>
    </div>
  )
}

export default Loader
