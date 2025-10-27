import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogado } from "../../hooks/useLogado";
import type { UsuarioType } from "../../types/usuario";
import { useNoticia } from "../../hooks/useNoticia";

const API_URL = "http://localhost:3001";

type ArtigoSalvo = NonNullable<UsuarioType["artigosSalvos"]>[number];

export default function Salvos() {
  const navigate = useNavigate();
  const { userIsLogged, userEmail, clearLogin } = useLogado();
  const news = useNoticia();

  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const [salvos, setSalvos] = useState<ArtigoSalvo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Salvos";
  }, []);

  useEffect(() => {
    if (!userIsLogged || !userEmail) {
      navigate("/login");
      return;
    }

    const email = userEmail!;
    const controller = new AbortController();

    async function carregarUsuario() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `${API_URL}/usuarios?email=${encodeURIComponent(email)}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Falha ao buscar o usuário.");

        const [user] = (await response.json()) as UsuarioType[];

        if (!user) {
          setErrorMessage("Não encontramos seus dados. Faça login novamente.");
          clearLogin("userToken");
          return;
        }

        setUsuario(user);
        setSalvos(user.artigosSalvos ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setErrorMessage("Não foi possível carregar seus salvos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarUsuario();
    return () => controller.abort();
  }, [clearLogin, navigate, userEmail, userIsLogged]);

  const temSalvos = useMemo(() => salvos && salvos.length > 0, [salvos]);

  function getInternalIndex(art: ArtigoSalvo): number | null {
    if (!news || news.length === 0) return null;
    const byTitle = news.findIndex((n) => n.title === art.nomeArtigo);
    if (byTitle >= 0) return byTitle;
    const byUrl = news.findIndex((n) => n.url === art.url);
    if (byUrl >= 0) return byUrl;
    return null;
  }

  function handleAbrirInterno(art: ArtigoSalvo) {
    const idx = getInternalIndex(art);
    if (idx !== null) {
      navigate(`/artigo/${idx + 1}`);
    } else {
      setErrorMessage(
        "Não foi possível abrir internamente. A notícia pode não estar no feed atual."
      );
    }
  }

  async function handleRemover(urlParaRemover: string) {
    if (!usuario) return;
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const novosSalvos = (usuario.artigosSalvos ?? []).filter(
        (a) => a.url !== urlParaRemover
      );

      const usuarioAtualizado: UsuarioType = { ...usuario, artigosSalvos: novosSalvos };

      const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioAtualizado),
      });

      if (!response.ok) throw new Error("Falha ao remover artigo salvo.");

      setUsuario(usuarioAtualizado);
      setSalvos(novosSalvos);
      setSuccessMessage("Artigo removido dos salvos.");
    } catch (e) {
      setErrorMessage("Não foi possível remover. Tente novamente.");
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Carregando seus salvos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <header className="max-w-5xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Artigos Salvos</h1>
        <p className="text-gray-600 mt-1">Acompanhe aqui as notícias que você salvou.</p>
      </header>

      <section className="max-w-5xl mx-auto">
        {errorMessage && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-50 text-green-700 border border-green-200">
            {successMessage}
          </div>
        )}

        {!temSalvos ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-700 mb-4">Você ainda não salvou nenhuma notícia.</p>
            <button
              type="button"
              className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              Explorar notícias
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {salvos.map((art) => (
              <li
                key={art.url}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => handleAbrirInterno(art)}
                    className="text-left text-blue-700 hover:text-blue-900 font-semibold break-words cursor-pointer"
                    title={art.nomeArtigo}
                  >
                    {art.nomeArtigo}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAbrirInterno(art)}
                    className="px-3 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900 transition cursor-pointer"
                  >
                    Abrir
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemover(art.url)}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
