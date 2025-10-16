import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/sobre">Sobre</Link>
            <span> | </span>
            <Link to="/cadastro">Cadastro</Link>
            <span> | </span>
            <Link to="/contato">Contato</Link>
        </nav>
    );
}