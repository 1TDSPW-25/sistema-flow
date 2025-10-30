import { useState } from "react";
import type { FormEvent } from "react";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      alert("Preencha nome, e-mail e mensagem.");
      return;
    }

    setEnviando(true);

    setTimeout(() => {
      alert(
        `Enviado!\n\nNome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`
      );
      setNome("");
      setEmail("");
      setMensagem("");
      setEnviando(false);
    }, 600);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-700 py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg-px-8 flex items-center justify-center">
      <section className="mx-auto w-full max-w-6xl flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-12">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-10 md:p-12 text-white shadow-2xl">
          <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[#1C3546]/50 blur-2xl" />
          <div className="absolute -bottom-16 -right-24 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

          <header className="relative space-y-4">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/90">
              Fale com a redação
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Contato
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Tem uma pauta urgente, sugestão de reportagem ou deseja falar com
              o nosso time comercial? Estamos prontos para ouvir você.
            </p>
          </header>

          <dl className="relative mt-10 space-y-5 sm:space-y-6 text-sm">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiMail className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                  E-mail principal
                </dt>
                <dd className="text-base font-semibold text-white break-all">
                  fiapnews@fiap.com
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiPhone className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[11px]uppercase tracking-[0.2em] text-gray-400">
                  Atendimento comercial
                </dt>
                <dd className="text-base font-semibold text-white">
                  (11) 3000-4000
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiClock className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                  Horário de resposta
                </dt>
                <dd className="text-base font-semibold text-white">
                  Até 1 dia útil
                </dd>
              </div>
            </div>
          </dl>

          <p className="relative mt-10 text-sm text-gray-400 leading-relaxed">
            Prefere falar com a equipe responsável por uma editoria específica?
            Indique no campo de mensagem e direcionaremos seu contato.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="h-full rounded-3xl border border-gray-200/80 dark:border-gray-800 bg-white/95 dark:bg-gray-900 p-6 sm:p-8 md:p-10 shadow-2xl shadow-gray-900/10 backdrop-blur flex flex-col justify-between"
        >
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-200"
              >
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                disabled={enviando}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4  py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Como devemos te chamar?"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-200"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={enviando}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mensagem"
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-200"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                rows={6}
                disabled={enviando}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Conte o que está acontecendo ou como podemos ajudar."
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:gap-5">
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Respondemos mensagens enviadas pelo formulário ou pelo e-mail
              acima dentro do próximo dia útil.
            </p>

            <button
              type="submit"
              disabled={enviando}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#1C3546] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white transition duration-200 hover:bg-[#30576b] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#1C3546] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
