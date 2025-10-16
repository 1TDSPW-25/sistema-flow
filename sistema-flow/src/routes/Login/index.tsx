import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UsuarioType } from "../../types/usuario";

const API_URL = "http://localhost:3001";

async function fetchUsuarios(): Promise<UsuarioType[]> {
  try {
    const maxRetries = 3;
    let delay = 1000;
    
    for (let i = 0; i < maxRetries; i++) {
        const response = await fetch(`${API_URL}/usuarios`);
        
        if (response.ok) {
            const data: UsuarioType[] = await response.json();
            return data;
        }

        if (i < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        } else {
            throw new Error(`Erro ao buscar usuários após ${maxRetries} tentativas: ${response.statusText}`);
        }
    }
    return []; 
  } catch (error) {
    console.error("Erro na busca de usuários pela API. Certifique-se de que o servidor está rodando.", error);
    return [];
  }
}
