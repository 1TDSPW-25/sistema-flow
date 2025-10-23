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
            // 2. Coletar todos os erros de validação
            const validationErrors: string[] = [];
            const emailExists = usuarios.some((user) => user.email === email);
            if (emailExists) {
                setError("Este e-mail já está em uso. Deseja fazer login?");
                setIsSubmitting(false);
                return;
                validationErrors.push("Este e-mail já está em uso.");
            }

            const userExists = usuarios.some((user) => user.nomeUser === nomeUser);
            if (userExists) {
                setError("Este nome de usuário já está em uso. Escolha outro ou faça login.");
                setIsSubmitting(false);
                return;
                validationErrors.push("Este nome de usuário já está em uso.");
            }

            // Se houver erros, exibe a mensagem e para a execução
            if (validationErrors.length > 0) {
                const errorMessage = validationErrors.join(" ");
                setError(emailExists ? `${errorMessage} Deseja fazer login?` : errorMessage);
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
        <main className="min-h-screen bg-[#EFEFEF] flex items-center justify-center p-4">
            <section className="w-full max-w-md bg-gray-900 shadow-xl rounded-lg p-8 space-y-6 border border-gray-200">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black tracking-tight text-[#FFFFFF]">Cadastro</h2>
                    <p className="text-[#FFFFFF] font-sans">Crie sua conta para continuar</p>
                </div>

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
                            className="w-full px-3 py-2 border border-[#cacaca] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-[#bbbbbb] text-white"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-md text-sm bg-red-100 text-red-700 border border-red-300">
                            {error}{" "}
                            {error.includes("login") && (
                                <Link to="/login" className="font-medium text-blue-700 underline">
                                    Ir para Login
                                </Link>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-[#1C3546] hover:bg-[#30576b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFFFFF] disabled:bg-gray-400 transition duration-150 ease-in-out"
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

                <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-[#FFFFFF]">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="font-medium text-[#ffffff] hover:text-[#d6e0ff]">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
