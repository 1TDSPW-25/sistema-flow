import React from "react";
import Menu from "../Menu/Menu";
import "./Cabecalho.css";

const Cabecalho: React.FC = () => {
  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        {/* Logo ou nome do sistema */}
        <h1 className="cabecalho-titulo">Sistema Flow</h1>

        {/* Menu de navegação */}
        <Menu />

        {/* Botão (exemplo) */}
        <button className="cabecalho-botao">Sair</button>
      </div>
    </header>
  );
};

export default Cabecalho;
