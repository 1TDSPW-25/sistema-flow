import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "./globals.css";

//Importando as rotas
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import EditarProduto from './routes/EditarProduto/index.tsx';
import Home from './routes/Home/index.tsx';
import Produtos from './routes/Produtos/index.tsx';
import Error from './routes/Error/index.tsx';
import GitUsers from './routes/GitUsers/index.tsx';
import CadProdutos from './routes/CadProdutos/index.tsx';
//Importando as rotas

const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>,
    children:[
      {path: "/", element: <Home/>},
      {path: "/produtos", element: <Produtos/>},
      {path: "/editar/produto/:id", element: <EditarProduto/>},
      {path: "/git-users", element: <GitUsers/>},
      {path: "/cad-produtos", element: <CadProdutos/>},
  ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
