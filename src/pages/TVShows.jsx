import React from "react"
import { Container } from "react-bootstrap"

const TVShows = () => {
  return (
    <div className="min-vh-100 bg-dark" style={{ paddingTop: "80px" }}>
      <Container fluid className="px-4 px-md-5 py-5">
        <h1 className="text-white display-4 fw-bold mb-4">TV Shows</h1>
        <p className="text-white-50 fs-5">
          Benvenuto nella sezione TV Shows! Qui troverai tutte le migliori serie
          televisive.
        </p>
        <div className="row g-4 mt-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-secondary rounded p-4">
              <h3 className="text-white h5">🎬 Contenuti in arrivo</h3>
              <p className="text-white-50 mb-0">
                Stiamo lavorando per portarti i migliori contenuti TV.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-secondary rounded p-4">
              <h3 className="text-white h5">⭐ Top Series</h3>
              <p className="text-white-50 mb-0">
                Le serie più popolari del momento, selezionate per te.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-secondary rounded p-4">
              <h3 className="text-white h5">🔥 Trending Now</h3>
              <p className="text-white-50 mb-0">
                Scopri cosa stanno guardando tutti in questo momento.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TVShows
