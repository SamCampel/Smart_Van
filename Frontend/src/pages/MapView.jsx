import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

export default function MapView() {
  const [points, setPoints] = useState([]);

  const handleMapClick = (latlng) => {
    if (points.length < 2) {
      setPoints([...points, latlng]);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer center={[-23.55, -46.63]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onClick={handleMapClick} />

        {points.map((p, index) => (
          <Marker key={index} position={[p.lat, p.lng]} />
        ))}

      </MapContainer>

      <div style={{ padding: 10 }}>
        {points.length === 0 && <p>Selecione o ponto de saída</p>}
        {points.length === 1 && <p>Selecione o destino</p>}
        {points.length === 2 && (
          <p>
            ✔ Pontos definidos.
            O sistema completo de rotas será implementado em breve.
          </p>
        )}
      </div>
    </div>
  );
}
