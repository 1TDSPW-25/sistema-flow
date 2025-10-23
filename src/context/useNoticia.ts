import { useContext } from "react";
import { NoticiasContext } from "./NoticiasContext";

export const useNoticia = () => useContext(NoticiasContext);
