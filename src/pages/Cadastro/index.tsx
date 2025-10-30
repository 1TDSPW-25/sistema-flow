import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UsuarioType } from "../../types/usuario";

const API_URL = "http://localhost:3001";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Buscar todos os usuários para validar
      const responseGet = await fetch(`${API_URL}/usuarios`);
      if (!responseGet.ok) {
        throw new Error("Falha ao conectar com o servidor. Tente novamente.");
      }
      const usuarios: UsuarioType[] = await responseGet.json();

      // 2. Verificar se o e-mail ou nome de usuário já existem
      const emailExists = usuarios.some((user) => user.email === email);
      if (emailExists) {
        setError("Este e-mail já está em uso. Deseja fazer login?");
        setIsSubmitting(false);
        return;
      }

      const userExists = usuarios.some((user) => user.nomeUser === nomeUser);
      if (userExists) {
        setError(
          "Este nome de usuário já está em uso. Escolha outro ou faça login."
        );
        setIsSubmitting(false);
        return;
      }

      // 3. Se não houver duplicidade, prosseguir com o cadastro
      const payload = { nome, nomeUser, email, senha };
      const responsePost = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!responsePost.ok) {
        throw new Error("Nao foi possivel cadastrar o usuario.");
      }

      // 4. Redirecionar para o login após sucesso
      navigate("/login");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Falha ao enviar cadastro.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-900 shadow-xl rounded-lg p-6 sm:p-8 md:p-10 space-y-6 border-2 border-gray-200 dark:border-gray-950">
        {/* Botão Voltar */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium cursor-pointer"
            aria-label="Voltar para a página inicial"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Voltar
          </button>
        </div>

        {/* Logo NewsLab clicável */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-block transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              News<span className="text-green-500">Lab</span>
            </span>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Cadastro
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-sans">
            Crie sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-white mb-1"
            >
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Seu nome completo"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400 text-white bg-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="nomeUser"
              className="block text-sm font-medium text-white mb-1"
            >
              Nome de usuário
            </label>
            <input
              id="nomeUser"
              name="nomeUser"
              value={nomeUser}
              onChange={(event) => setNomeUser(event.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Seu nome de usuário"
              className="w-full px-3 py-2 sm:px-4 sm:py-3  border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400 text-white bg-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isSubmitting}
              placeholder="seu.email@exemplo.com"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400 text-white bg-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-white mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Digite sua senha"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400 text-white bg-transparent"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md text-sm bg-red-100 text-red-700 border border-red-300">
              {error}{" "}
              {error.includes("login") && (
                <Link
                  to="/login"
                  className="font-medium text-blue-700 underline"
                >
                  Ir para Login
                </Link>
              )}
            </div>
          )}

          <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-2 sm:py-3 border border-transparent rounded-md text-base sm:text-lg font-semibold text-white bg-[#1C3546] hover:bg-[#30576b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:bg-gray-400 transition duration-150 ease-in-out cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isSubmitting ? "Enviando..." : "Cadastrar"}
              </span>
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>

        <div className="text-center pt-6 sm:pt-8 border-t border-gray-700 mt-4 sm:mt-6">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-medium text-white underline-offset-4 hover:underline hover:text-green-500 focus-visible:text-green-500 transition-colors"
              aria-label="Ir para a página de login"
            >
              Faça seu login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}