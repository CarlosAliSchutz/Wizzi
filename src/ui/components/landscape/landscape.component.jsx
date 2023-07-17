import { useEffect, useState } from "react";
import { DESTINATIONS } from "../../../constants/destinations";
import "./index.css";

export function Landscape() {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  // Atualiza o destino a cada 10 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDestinationIndex(
        (prevIndex) => (prevIndex + 1) % DESTINATIONS.length
      );
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <figure className="landscape">
        {DESTINATIONS.map((destination, index) => (
          <div
            key={index}
            className={`slide ${
              index === currentDestinationIndex ? "active" : ""
            }`}
          >
            <img src={destination.image} alt={`Foto de ${destination.name}`} />
            <figcaption className="landscape-text">
              <h1>{destination.name}</h1>
              <p>{destination.description}</p>
            </figcaption>
          </div>
        ))}
      </figure>
    </section>
  );
}
