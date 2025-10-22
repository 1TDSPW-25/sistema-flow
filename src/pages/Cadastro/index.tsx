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
        <main>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                />

                <label htmlFor="nomeUser">Nome de usuario</label>
                <input
                    id="nomeUser"
                    name="nomeUser"
                    value={nomeUser}
                    onChange={(event) => setNomeUser(event.target.value)}
                    required
                />

                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="senha">Senha</label>
                <input
                    id="senha"
                    name="senha"
                    type="password"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    required
                />

                {error && (
                    <p style={{ color: 'red' }}>
                        {error}{" "}
                        {error.includes("login") && (
                            <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Ir para Login
                            </Link>
                        )}
                    </p>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Cadastrar"}
                </button>
            </form>
        </main>
    );
}
