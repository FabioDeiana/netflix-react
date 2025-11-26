import React from "react"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const ErrorMessage = ({
  message = "Si è verificato un errore",
  onRetry,
  showHomeButton = false,
  fullScreen = false,
}) => {
  const navigate = useNavigate()

  const content = (
    <Alert
      variant="danger"
      className="bg-transparent border-danger text-center"
    >
      <Alert.Heading className="h5">⚠️ Oops!</Alert.Heading>
      <p className="mb-3">{message}</p>
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        {onRetry && (
          <Button variant="outline-danger" size="sm" onClick={onRetry}>
            🔄 Riprova
          </Button>
        )}
        {showHomeButton && (
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate("/")}
          >
            🏠 Torna alla Home
          </Button>
        )}
      </div>
    </Alert>
  )

  if (fullScreen) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 bg-dark px-3"
        style={{ paddingTop: "80px" }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>{content}</div>
      </div>
    )
  }

  return content
}

export default ErrorMessage
