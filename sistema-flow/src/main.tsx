import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './routes/Login/index.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>, 
    children:[
      {path: "/", element: <Login/>},
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
