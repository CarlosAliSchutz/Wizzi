import React, { useState } from "react";
import { Modal } from "../modal/modal.component";
import { Search } from "../search/search.component";
import { DESTINATIONS } from "../../../constants/destinations";
import "./index.css";

export function Trips() {
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal com o destino selecionado
  function handleOpenModal(destinationName) {
    setSelectedDestination(destinationName);
    setIsModalOpen(true);
  }

  // Função para fechar o modal
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  // Função para realizar a pesquisa de destinos
  function handleSearch(searchText) {
    // Mostrar todos os destinos quando a pesquisa estiver vazia
    if (searchText === "") {
      setDestinations(DESTINATIONS);
    } else {
      // Filtrar os destinos com base no texto de pesquisa
      const filteredDestinations = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setDestinations(filteredDestinations);
    }
  }

  return (
    <>
      <Search onSearch={handleSearch} />
      <h1 className="title-travel">Destinos</h1>
      <section className="container-travel">
        {destinations.map((destination) => (
          <div className="travel-box" key={destination.name}>
            <img
              src={destination.image}
              alt={`Foto de ${destination.name}`}
            />
            <h2>{destination.name}</h2>
            <button onClick={() => handleOpenModal(destination.name)}>+</button>
          </div>
        ))}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          destinationName={selectedDestination}
        />
      </section>
    </>
  );
}
