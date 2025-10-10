import React from "react";
import Menu from "../Menu/Menu";
import Rodape from "../Rodape/Rodape";

const Cabecalho: React.FC = () => {
  return (
    <header>
      <div>
        {/* Logo ou nome do sistema */}
        <h1 >Sistema Flow</h1>

        {/* Menu de navegação */}
        <Menu />
        <Rodape />

        {/* Botão (exemplo) */}
        <button >Sair</button>
      </div>
    </header>
  );
};

export default Cabecalho;
