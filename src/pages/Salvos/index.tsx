import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogado } from "../../hooks/useLogado";
import { useNoticia } from "../../hooks/useNoticia";
import type { UsuarioType } from "../../types/usuario";
import { FaSpinner } from "react-icons/fa";

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
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sortKey, setSortKey] = useState<"title_asc" | "title_desc" | "source_asc" | "source_desc">("title_asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = "Salvos";
  }, []);

  useEffect(() => {
    if (!userIsLogged || !userEmail) {
      navigate("/login");
      return;
    }

    const email = userEmail;
    const controller = new AbortController();

    async function carregarUsuario() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `${API_URL}/usuarios?email=${encodeURIComponent(email!)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Falha ao buscar o usuario.");

        const [user] = (await response.json()) as UsuarioType[];
        if (!user) {
          setErrorMessage("Nao encontramos seus dados. Faca login novamente.");
          clearLogin("userToken");
          return;
        }

        setUsuario(user);
        setSalvos(user.artigosSalvos ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setErrorMessage("Nao foi possivel carregar seus salvos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarUsuario();
    return () => controller.abort();
  }, [clearLogin, navigate, userEmail, userIsLogged]);

  const temSalvos = useMemo(() => salvos.length > 0, [salvos]);

  const normalize = (s: string) =>
    (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const getDomain = (url: string) => {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  };

  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    salvos.forEach((a) => {
      const d = getDomain(a.url);
      if (d) set.add(d);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [salvos]);

  const filtrados = useMemo(() => {
    const base = salvos.filter((a) =>
      sourceFilter ? getDomain(a.url) === sourceFilter : true,
    );
    if (!search) return base;
    const q = normalize(search);
    return base.filter(
      (a) => normalize(a.nomeArtigo).includes(q) || normalize(a.url).includes(q),
    );
  }, [salvos, search, sourceFilter]);

  const sorted = useMemo(() => {
    const list = [...filtrados];
    const byTitle = (a: ArtigoSalvo, b: ArtigoSalvo) =>
      normalize(a.nomeArtigo).localeCompare(normalize(b.nomeArtigo));
    const bySource = (a: ArtigoSalvo, b: ArtigoSalvo) =>
      getDomain(a.url).localeCompare(getDomain(b.url));
    switch (sortKey) {
      case "title_desc":
        return list.sort((a, b) => -byTitle(a, b));
      case "source_asc":
        return list.sort(bySource);
      case "source_desc":
        return list.sort((a, b) => -bySource(a, b));
      case "title_asc":
      default:
        return list.sort(byTitle);
    }
  }, [filtrados, sortKey]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sorted.length / pageSize)),
    [sorted],
  );
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  useEffect(() => {
    const tp = Math.max(1, Math.ceil(sorted.length / pageSize));
    if (page > tp) setPage(tp);
  }, [sorted, pageSize, page]);

  useEffect(() => {
    setPage(1);
  }, [search, sourceFilter, sortKey]);

  useEffect(() => {
    // Remove selecao de itens que nao estao mais presentes
    setSelected((prev) => {
      const urls = new Set(sorted.map((a) => a.url));
      const next = new Set<string>();
      prev.forEach((u) => {
        if (urls.has(u)) next.add(u);
      });
      return next;
    });
  }, [sorted]);

  const isSelected = (url: string) => selected.has(url);
  const toggleSelect = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url); else next.add(url);
      return next;
    });
  };
  const pageAllSelected = useMemo(() => paginated.every((a) => selected.has(a.url)) && paginated.length > 0, [paginated, selected]);
  const toggleSelectPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (pageAllSelected) {
        paginated.forEach((a) => next.delete(a.url));
      } else {
        paginated.forEach((a) => next.add(a.url));
      }
      return next;
    });
  };
  const selectAllFiltered = () => setSelected(new Set(sorted.map((a) => a.url)));
  const clearSelection = () => setSelected(new Set());

  async function handleRemoveSelected() {
    if (!usuario || selected.size === 0) return;
    const confirmar = window.confirm(`Remover ${selected.size} item(ns) dos salvos?`);
    if (!confirmar) return;
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      const removeSet = new Set(selected);
      const novosSalvos = (usuario.artigosSalvos ?? []).filter((a) => !removeSet.has(a.url));
      const usuarioAtualizado: UsuarioType = { ...usuario, artigosSalvos: novosSalvos };
      const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioAtualizado),
      });
      if (!response.ok) throw new Error("Falha ao remover selecionados.");
      setUsuario(usuarioAtualizado);
      setSalvos(novosSalvos);
      clearSelection();
      setSuccessMessage("Itens removidos com sucesso.");
    } catch (e) {
      setErrorMessage("Nao foi possivel remover selecionados. Tente novamente.");
    }
  }

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
        "Nao foi possivel abrir internamente. A noticia pode nao estar no feed atual.",
      );
    }
  }

  async function handleRemover(urlParaRemover: string) {
    if (!usuario) return;
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const novosSalvos = (usuario.artigosSalvos ?? []).filter(
        (a) => a.url !== urlParaRemover,
      );

      const usuarioAtualizado: UsuarioType = {
        ...usuario,
        artigosSalvos: novosSalvos,
      };

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
      setErrorMessage("Nao foi possivel remover. Tente novamente.");
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <FaSpinner className="h-10 w-10 text-blue-600 animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Carregando seus salvos...</h2>
        <p className="text-gray-600">Por favor, aguarde um momento.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
    <header className="max-w-5xl mx-auto mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Artigos Salvos</h1>
      <p className="text-gray-600 mt-2 text-lg">Acompanhe aqui as notícias que você salvou.</p>
    </header>

      <section className="max-w-5xl mx-auto">
        {/* Busca, filtros e ordenacao */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar salvos..."
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {(search || sourceFilter) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSourceFilter("");
              }}
              className="px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Limpar
            </button>
          )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Todas as fontes</option>
              {uniqueSources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="title_asc">Titulo A-Z</option>
              <option value="title_desc">Titulo Z-A</option>
              <option value="source_asc">Fonte A-Z</option>
              <option value="source_desc">Fonte Z-A</option>
            </select>
          </div>
        </div>
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
            <p className="text-gray-700 mb-4">Voce ainda nao salvou nenhuma noticia.</p>
            <button
              type="button"
              className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              Explorar noticias
            </button>
          </div>
        ) : (
          <>
            {/* Controles de selecao em massa */}
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="select-page"
                  type="checkbox"
                  checked={pageAllSelected}
                  onChange={toggleSelectPage}
                />
                <label htmlFor="select-page" className="text-sm text-gray-700">
                  Selecionar pagina ({paginated.length})
                </label>
                <button
                  type="button"
                  onClick={selectAllFiltered}
                  className="text-sm px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                >
                  Selecionar todos ({sorted.length})
                </button>
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-sm px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    Limpar selecao
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selected.size} selecionado(s)</span>
                <button
                  type="button"
                  disabled={selected.size === 0}
                  onClick={handleRemoveSelected}
                  className={`px-3 py-2 text-sm rounded-md border transition ${
                    selected.size === 0
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-red-600 text-white border-red-600 hover:bg-red-700 cursor-pointer"
                  }`}
                >
                  Remover selecionados
                </button>
              </div>
            </div>
            <ul className="space-y-4">
              {paginated.map((art) => (
                <li
                  key={art.url}
                  className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="min-w-0 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected(art.url)}
                      onChange={() => toggleSelect(art.url)}
                    />
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
            {!filtrados.length && (
              <div className="mt-6 text-sm text-gray-600">Nenhuma noticia encontrada.</div>
            )}
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-600">Pagina {page} de {totalPages}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`px-3 py-2 text-sm rounded-md border transition ${
                    page <= 1
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`px-3 py-2 text-sm rounded-md border transition ${
                    page >= totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  Proxima
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
