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
  
  const [loginSuccess, setLoginSuccess] = useState(false); 

  useEffect(() => {
    document.title = "Login";
  }, []);
  
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setLoginSuccess(false); 
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
      setLoginSuccess(true); 

      localStorage.setItem('userToken', usuarioValido.email);

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      setMensagem("Ocorreu um erro inesperado. Tente novamente.");
      setCorMensagem("red");
    } finally {
      if (!loginSuccess) { 
        setIsLoading(false);
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-6 border border-gray-200">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-bold text-orange-700">Login</h2>
          <p className="text-gray-500 font-sans">
            Acesse sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>

          <div>
            <label 
              htmlFor="senha" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
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