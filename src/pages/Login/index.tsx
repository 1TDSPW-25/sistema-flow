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
      console.error("Erro inesperado ao tentar logar.", error);
      setMensagem("Ocorreu um erro inesperado. Tente novamente.");
      setCorMensagem("red");
    } finally {
      if (!loginSuccess) { 
        setIsLoading(false);
      }
    }
  }



  return (
    <main className="min-h-screen bg-[#EFEFEF] flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-gray-900 shadow-xl rounded-lg p-8 space-y-6 border border-gray-200">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-[#FFFFFF]">Login</h2>
          <p className="text-[#FFFFFF] font-sans">
            Acesse sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-[#FFFFFF] mb-1"
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
              className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
            />
          </div>

          <div>
            <label 
              htmlFor="senha" 
              className="block text-sm font-medium text-[#FFFFFF] mb-1"
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
              className="w-full px-3 py-2 border border-[#cacaca]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
            />
          </div>
 
          {mensagem && (
            <div
              className={`p-3 rounded-md text-sm ${
                corMensagem === "red"
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {mensagem}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-[#1C3546] hover:bg-[#30576b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFFFFF] disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLoading ? "Entrando..." : "Entrar"}
              </span>
            ) : "Entrar"}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-[#FFFFFF]">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="font-medium text-[#ffffff] hover:text-[#d6e0ff]"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
