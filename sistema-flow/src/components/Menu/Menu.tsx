import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/produtos">Sobre</Link>
            <span> | </span>
            <Link to="/cad-produtos">Serviços</Link>
            <span> | </span>
            <Link to="/git-users">Contato</Link>
        </nav>
    );
}