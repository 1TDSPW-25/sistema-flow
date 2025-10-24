import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { useLogado } from "../../hooks/useLogado";
import type { UsuarioType } from "../../types/usuario";

const API_URL = "http://localhost:3001";

type PerfilFormState = Pick<UsuarioType, "nome" | "email" | "senha">;

export default function Perfil() {
  const navigate = useNavigate();
  const { userIsLogged, userEmail, clearLogin } = useLogado();

  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [formValues, setFormValues] = useState<PerfilFormState>({
    nome: "",
    email: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Perfil";
  }, []);

  useEffect(() => {
    if (!userIsLogged || !userEmail) {
      navigate("/login");
      return;
    }

    const emailDoUsuario = userEmail!;
    const controller = new AbortController();

    async function carregarUsuario() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `${API_URL}/usuarios?email=${encodeURIComponent(emailDoUsuario)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Falha ao buscar o usu\u00e1rio.");
        }

        const [usuarioEncontrado] = (await response.json()) as UsuarioType[];

        if (!usuarioEncontrado) {
          setErrorMessage(
            "N\u00e3o encontramos seus dados. Fa\u00e7a login novamente.",
          );
          clearLogin("userToken");
          return;
        }

        setUsuario(usuarioEncontrado);
        setFormValues({
          nome: usuarioEncontrado.nome ?? "",
          email: usuarioEncontrado.email ?? "",
          senha: usuarioEncontrado.senha ?? "",
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setErrorMessage(
          "N\u00e3o foi poss\u00edvel carregar os dados. Tente novamente.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    carregarUsuario();

    return () => controller.abort();
  }, [clearLogin, navigate, userEmail, userIsLogged]);

  function handleLogout() {
    clearLogin("userToken");
    navigate("/login");
    window.location.reload();
  }

  async function handleDeleteAccount() {
    if (!usuario?.id) {
      setErrorMessage("N\u00e3o foi poss\u00edvel identificar o usu\u00e1rio.");
      return;
    }

    const confirmarExclusao = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Essa a\u00e7\u00e3o n\u00e3o poder\u00e1 ser desfeita.",
    );

    if (!confirmarExclusao) {
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir conta.");
      }

      setSuccessMessage("Conta exclu\u00edda com sucesso.");
      clearLogin("userToken");

      setTimeout(() => {
        navigate("/cadastro");
        window.location.reload();
      }, 1200);
    } catch {
      setErrorMessage("N\u00e3o foi poss\u00edvel excluir sua conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggleEdit() {
    if (!usuario) {
      setErrorMessage("Carregue os dados antes de editar.");
      return;
    }

    setFormValues({
      nome: usuario.nome ?? "",
      email: usuario.email ?? "",
      senha: usuario.senha ?? "",
    });
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsEditing(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!usuario?.id) {
      setErrorMessage("N\u00e3o foi poss\u00edvel identificar o usu\u00e1rio.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const payload = {
        nome: formValues.nome.trim(),
        email: formValues.email.trim(),
        senha: formValues.senha.trim(),
      };

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar usu\u00e1rio.");
      }

      const usuarioAtualizado = (await response.json()) as UsuarioType;

      setUsuario(usuarioAtualizado);
      setFormValues({
        nome: usuarioAtualizado.nome ?? "",
        email: usuarioAtualizado.email ?? "",
        senha: usuarioAtualizado.senha ?? "",
      });
      setSuccessMessage("Dados atualizados com sucesso.");
      setIsEditing(false);
    } catch {
      setErrorMessage("N\u00e3o foi poss\u00edvel atualizar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setErrorMessage(null);
  }

  if (!userIsLogged) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#EFEFEF] py-16 px-4">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200/80 bg-white/95 p-10 shadow-2xl shadow-gray-900/10 backdrop-blur">
        <header className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Minha conta
          </p>
          <h1 className="text-4xl font-black tracking-tight text-[#1C3546]">
            Perfil
          </h1>
          <p className="text-sm text-gray-500">
            Revise seus dados e gerencie sua conta.
          </p>
        </header>

        {isLoading && (
          <p className="mb-6 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Carregando informa\u00e7\u00f5es...
          </p>
        )}

        {errorMessage && (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        )}

        <article className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Nome completo
            </span>
            <p className="text-xl font-semibold text-gray-900">
              {usuario?.nome || "N\u00e3o informado"}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              E-mail
            </span>
            <p className="text-xl font-semibold text-gray-900">
              {usuario?.email || "N\u00e3o informado"}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Senha
            </span>
            <p className="text-xl font-semibold text-gray-900">
              {usuario?.senha ? "\u2022".repeat(Math.min(usuario.senha.length, 12)) : "N\u00e3o informada"}
            </p>
          </div>
        </article>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="rounded-xl bg-[#1C3546] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#30576b] disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleToggleEdit}
            disabled={isLoading || !usuario}
          >
            Editar
          </button>
          <button
            type="button"
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleDeleteAccount}
            disabled={isLoading || !usuario}
          >
            Excluir
          </button>
          <button
            type="button"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-700 transition hover:bg-gray-100"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>

        {isEditing && (
          <form
            onSubmit={handleSubmitEdit}
            className="mt-10 space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-inner"
          >
            <h2 className="text-lg font-bold text-gray-900">Editar dados</h2>

            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
              >
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                value={formValues.nome}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20"
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="senha"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500"
              >
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={formValues.senha}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20"
                placeholder="Atualize sua senha"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-600 transition hover:bg-gray-100"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1C3546] px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#30576b]"
                disabled={isLoading}
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
