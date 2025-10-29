import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.tsx";
import { NoticiasProvider } from "./context/NoticiasContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <NoticiasProvider>
        <RouterProvider router={router} />
      </NoticiasProvider>
    </UserProvider>
  </StrictMode>
);
