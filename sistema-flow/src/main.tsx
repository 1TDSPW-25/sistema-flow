import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Cad from './routes/Cad/index.tsx'

const router = createBrowserRouter([
  {path: "/cadastro", element: <Cad/>},  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
