import React from "react"
import { Alert, Button } from "react-bootstrap"

const ErrorMessage = ({ message = "Si è verificato un errore", onRetry }) => {
  return (
    <Alert
      variant="danger"
      className="bg-transparent border-danger text-center py-4"
    >
      <Alert.Heading className="h5">⚠️ Oops!</Alert.Heading>
      <p className="mb-3">{message}</p>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          🔄 Riprova
        </Button>
      )}
    </Alert>
  )
}

export default ErrorMessage
