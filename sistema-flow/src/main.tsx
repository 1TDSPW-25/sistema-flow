import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login/index.tsx";
import Cadastro from "./routes/Cadastro/index.tsx";
import Home from "./routes/Home/index.tsx";
import Sobre from "./routes/Sobre/index.tsx";
import Contato from "./routes/Contato/index.tsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/home", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/contato", element: <Contato /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
