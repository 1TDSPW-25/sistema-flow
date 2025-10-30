import App from "../App.tsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/index.tsx";
import Cadastro from "../pages/Cadastro/index.tsx";
import Home from "../pages/Home/index.tsx";
import Sobre from "../pages/Sobre/index.tsx";
import Integrantes from "../pages/Integrantes/index.tsx";
import Contato from "../pages/Contato/index.tsx";
import Erro from "../pages/Erro/index.tsx";
import { Artigo } from "../pages/Artigo/Artigo.tsx";
import Perfil from "../pages/Perfil/index.tsx";
import Salvos from "../pages/Salvos/index.tsx";
import "../main.css";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Erro/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/home", element: <Home /> },
      { path: "/artigo/:id", element: <Artigo /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/contato", element: <Contato /> },
      { path: "/login", element: <Login /> },
      { path: "/editar-cadastro/:id", element: <Cadastro /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/salvos", element: <Salvos /> },
    ],
  },
], {basename:"/sistema-flow"} );

