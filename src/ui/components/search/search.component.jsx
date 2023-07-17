import "./index.css";

export function Search({ onSearch }) {
  // Função de manipulação de eventos para alterar o texto de pesquisa
  function handleSearchChange(event) {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Pesquisar..."
        onChange={handleSearchChange}
      />
    </div>
  );
}
