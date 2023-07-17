import logo from "../../../assets/icon/Logo.png";
import perfil from "../../../assets/icon/perfil.png";
import "./index.css";

export function Header() {
  return (
    <>
      <header>
        <img className="logo-icon" src={logo} alt="Logo da Wizzi" />
        <h1 className="title">Home</h1>
        <img
          className="user-icon"
          src={perfil}
          alt="Foto de perfil do usuário"
        />
      </header>
    </>
  );
}
