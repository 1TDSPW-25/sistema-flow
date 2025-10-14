export default function Menu() {
    return (
        <header className="container-menu">
            <div className="menu-logo">
            <h1>Logo</h1>
            </div>
            <nav className="menu-navegacao">
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Serviço</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </nav>
            <div className="menu-acoes">
                <button>Entrar</button>
            </div>
        </header>

    );
}