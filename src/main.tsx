import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx";
import { NoticiasProvider } from "./context/NoticiasContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoticiasProvider>
      <RouterProvider router={router} />
    </NoticiasProvider>
  </StrictMode>
);
