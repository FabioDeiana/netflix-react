import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = ({ text = "Caricamento..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="danger" className="mb-3" />
      <span className="text-white-50">{text}</span>
    </div>
  )
}

export default Loader
