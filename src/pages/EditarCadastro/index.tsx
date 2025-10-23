// src/pages/EditarCadastro/index.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditarCadastro() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [nome, setNome] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading] = useState(false); 

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
  }

  return (
    <main className="min-h-screen bg-[#EFEFEF] flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-gray-900 shadow-xl rounded-lg p-8 space-y-6 border border-gray-200">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-[#FFFFFF]">Editar cadastro</h2>
          <p className="text-[#FFFFFF] font-sans">Atualize suas informações</p>
        </div>

        {isLoading ? (
          <div className="text-center text-[#FFFFFF]">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-[#FFFFFF] mb-1">
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
                className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
              />
            </div>

            <div>
              <label htmlFor="nomeUser" className="block text-sm font-medium text-[#FFFFFF] mb-1">
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
                className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF] mb-1">
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
                className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-[#FFFFFF] mb-1">
                Nova senha (opcional)
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                disabled={isSubmitting}
                placeholder="Preencha para alterar a senha"
                className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
              />
            </div>

            {error && (
              <div className="p-3 rounded-md text-sm bg-red-100 text-red-700 border border-red-300">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
                className="w-1/2 flex justify-center py-2 px-4 border border-[#bbbbbb] rounded-md shadow-sm text-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFFFFF] disabled:bg-gray-400 transition duration-150 ease-in-out"
              >
                Voltar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-[#1C3546] hover:bg-[#30576b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFFFFF] disabled:bg-gray-400 transition duration-150 ease-in-out"
              >
                Salvar alterações
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#FFFFFF]">
                Precisa entrar?{" "}
                <Link to="/login" className="font-medium text-[#ffffff] hover:text-gray-400">
                  Fazer login
                </Link>
              </p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
