import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/produtos">Produtos</Link>
            <span> | </span>
            <Link to="/cad-produtos">Cadastro de Produtos</Link>
            <span> | </span>
            <Link to="/git-users">Git Usuários</Link>
        </nav>
    );
}