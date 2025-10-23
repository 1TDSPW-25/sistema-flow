import { useContext } from "react";
import { NoticiasContext } from "../context/NoticiasContext";

export const useNoticia = () => useContext(NoticiasContext);
