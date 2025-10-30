import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { UsuarioType } from "../../types/usuario";

const API_URL = "http://localhost:3001";

export default function EditarCadastro() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [nome, setNome] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); 
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      try {
        setError(null);
        setIsLoading(true);

        if (!id) {
          throw new Error("ID do usuário não informado.");
        }

        const res = await fetch(`${API_URL}/usuarios/${id}`);
        if (!res.ok) {
          throw new Error("Falha ao carregar dados do usuário.");
        }
        const user: UsuarioType = await res.json();

        if (!isMounted) return;
        setNome(user.nome ?? "");
        setNomeUser(user.nomeUser ?? "");
        setEmail(user.email ?? "");
        
      } catch (e) {
        const message = e instanceof Error ? e.message : "Erro ao carregar dados.";
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!id) {
        throw new Error("ID do usuário não informado.");
      }

      
      const responseGet = await fetch(`${API_URL}/usuarios`);
      if (!responseGet.ok) {
        throw new Error("Falha ao conectar com o servidor. Tente novamente.");
      }
      const usuarios: UsuarioType[] = await responseGet.json();

      const meId = Number(id);
      const emailExists = usuarios.some(
        (u) => u.email === email && Number(u.id) !== meId
      );
      if (emailExists) {
        setError("Este e-mail já está em uso por outro usuário.");
        setIsSubmitting(false);
        return;
      }

      const userExists = usuarios.some(
        (u) => u.nomeUser === nomeUser && Number(u.id) !== meId
      );
      if (userExists) {
        setError("Este nome de usuário já está em uso por outro usuário.");
        setIsSubmitting(false);
        return;
      }

      
      const payload: Partial<UsuarioType> & {
        senha?: string;
        nome?: string;
        nomeUser?: string;
        email?: string;
      } = {
        nome,
        nomeUser,
        email,
      };
      if (senha.trim().length > 0) {
        payload.senha = senha;
      }

    
      const responseUpdate = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!responseUpdate.ok) {
        throw new Error("Não foi possível atualizar o cadastro.");
      }

      
      navigate("/login"); 
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Falha ao atualizar cadastro.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
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
                    Salvando...
                  </span>
                ) : (
                  "Salvar alterações"
                )}
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