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

export default function Login() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
 
  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    document.title = "Login";
  }, []);
 
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setIsLoading(true);
 
    try {
      const usuarios = await fetchUsuarios();
     
      if (usuarios.length === 0) {
        setMensagem("Erro de conexão. Não foi possível carregar os usuários. Verifique o servidor.");
        setCorMensagem("red");
        return;
      }
 
      const usuarioValido = usuarios.find(
        (user) => user.email === email && user.senha === senha
      );
 
      if (!usuarioValido) {
        setMensagem("E-mail ou senha incorretos.");
        setCorMensagem("red");
        return;
      }
 
      setMensagem("Login realizado com sucesso! Redirecionando...");
      setCorMensagem("green");
 
      localStorage.setItem('userToken', usuarioValido.email);
 
      setTimeout(() => {
        navigate("/home");
      }, 1500);
 
    } catch (error) {
      console.error("Erro inesperado ao tentar logar.", error);
      setMensagem("Ocorreu um erro inesperado. Tente novamente.");
      setCorMensagem("red");
    } finally {
      if (corMensagem !== "green") {
        setIsLoading(false);
      }
    }
  }

  return (
    <main>
      <section>
        <div>
          <h2>Login</h2>
          <p>
            Acesse sua conta para continuar
          </p>
        </div>
 
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              disabled={isLoading}
            />
          </div>
 
          <div>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={isLoading}
            />
          </div>
 
          {mensagem && (
            <div
              style={{ color: corMensagem === "red" ? "red" : "green" }}
            >
              {mensagem}
            </div>
          )}
         
          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
 
        <div>
          <p>
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
