import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

export function Modal({ isOpen, onClose, destinationName }) {
  // Definição dos estados iniciais usando o Hook useState
  const modalRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [adultPassengers, setAdultPassengers] = useState(0);
  const [childPassengers, setChildPassengers] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Função de manipulação de cliques fora do modal
  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    // Adicionar evento de clique fora do modal quando o modal estiver aberto
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Remover evento de clique fora do modal quando o componente for desmontado
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Resetar os estados quando o modal for fechado
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setAdultPassengers(0);
      setChildPassengers(0);
      setEndDate(null);
      setStartDate(null);
      setShowConfirmationModal(false);
    }
  }, [isOpen]);

  // Renderizar null se o modal estiver fechado
  if (!isOpen) {
    return null;
  }

  // Função de manipulação de eventos para alterar a data de início
  function handleStartDateChange(date) {
    setStartDate(date);
    setError(null);
  }

  // Função de manipulação de eventos para alterar a data de retorno
  function handleEndDateChange(date) {
    setEndDate(date);
    setError(null);
  }

  // Função de manipulação de eventos para alterar o número de passageiros adultos
  function handleAdultPassengerChange(action) {
    if (action === "increase") {
      setAdultPassengers((prevValue) => prevValue + 1);
    } else if (action === "decrease" && adultPassengers > 0) {
      setAdultPassengers((prevValue) => prevValue - 1);
    }
  }

  // Função de manipulação de eventos para alterar o número de passageiros crianças
  function handleChildPassengerChange(action) {
    if (action === "increase") {
      setChildPassengers((prevValue) => prevValue + 1);
    } else if (action === "decrease" && childPassengers > 0) {
      setChildPassengers((prevValue) => prevValue - 1);
    }
  }

  // Função de manipulação de eventos para enviar o formulário
  function handleSubmit(event) {
    event.preventDefault();

    // Validar os campos do formulário
    const form = event.target;
    const formData = new FormData(form);

    const isFormValid = Array.from(formData.values()).every(
      (value) => value.trim() !== ""
    );
    if (!isFormValid) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Validar a data de retorno
    if (startDate && endDate && endDate < startDate) {
      setError("A data de volta não pode ser anterior à data de ida.");
      return;
    }

    // Validar o número de passageiros
    if (adultPassengers === 0 && childPassengers === 0) {
      setError("Selecione pelo menos um passageiro.");
      return;
    }

    // Validar o número de adultos
    if (adultPassengers === 0 && childPassengers > 0) {
      setError("Necessário ter pelo menos um adulto.");
      return;
    }

    // Enviar o formulário com sucesso
    setSuccessMessage("Checkout enviado com sucesso!");
    form.reset();
    setStartDate(null);
    setEndDate(null);
    setAdultPassengers(0);
    setChildPassengers(0);
    setShowConfirmationModal(true);
  }

  function handleCloseConfirmationModal() {
    setShowConfirmationModal(false);
    onClose();
  }

  if (showConfirmationModal) {
    return (
      <div className="modal">
        <div ref={modalRef} className="modal-content">
          <div className="confirmation-modal">
            <div className="confirmation-modal-content">
              <h3>Confirmação</h3>
              <p>{successMessage}</p>
              <p>Destino: {destinationName}</p>
              <button onClick={handleCloseConfirmationModal}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Confirmação</h3>
            <p>{successMessage}</p>
            <button onClick={handleCloseConfirmationModal}>Fechar</button>
          </div>
        </div>
      )}
      <div ref={modalRef} className="modal-content">
        <div className="close-modal" onClick={onClose}>
          X
        </div>
        <h2>Checkout de Viagem</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="modal-turned">
            <label>
              Data de ida:
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data de ida"
                calendarClassName="calendar-small"
              />
            </label>
            <label>
              Data de volta:
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a data de volta"
                calendarClassName="calendar-small"
              />
            </label>
            <label>
              Nome do passageiro principal:
              <input type="text" name="mainPassengerName" />
            </label>
            <label>
              E-mail do passageiro principal:
              <input type="email" name="mainPassengerEmail" />
            </label>
            <label>
              Origem:
              <input type="text" name="origin" />
            </label>
            <label>
              Destino:
              <input
                disabled
                value={destinationName}
                type="text"
                name="destination"
              />
            </label>
          </div>
          <div className="modal-turned">
            <div className="number-passengers">
              <label>
                Adultos:
                <div>
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleAdultPassengerChange("decrease")}
                    disabled={adultPassengers === 0}
                  >
                    -
                  </button>
                  <span>{adultPassengers}</span>
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleAdultPassengerChange("increase")}
                  >
                    +
                  </button>
                </div>
              </label>
              <label>
                Crianças:
                <div>
                  <button
                    className="button"
                    type="button"
                    onClick={() => handleChildPassengerChange("decrease")}
                    disabled={childPassengers === 0}
                  >
                    -
                  </button>
                  <span>{childPassengers}</span>
                  <button
                    type="button"
                    onClick={() => handleChildPassengerChange("increase")}
                  >
                    +
                  </button>
                </div>
              </label>
            </div>
          </div>
          <div className="modal-turned"></div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  destinationName: PropTypes.string.isRequired,
};
