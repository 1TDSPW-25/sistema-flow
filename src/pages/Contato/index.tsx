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
    <main className="min-h-screen bg-[#EFEFEF] py-16 px-4">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 text-white shadow-2xl">
          <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[#1C3546]/50 blur-2xl" />
          <div className="absolute -bottom-16 -right-24 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

          <header className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/90">
              Fale com a redação
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Contato
            </h1>
            <p className="text-base text-gray-300">
              Tem uma pauta urgente, sugestão de reportagem ou deseja falar com
              o nosso time comercial? Estamos prontos para ouvir você.
            </p>
          </header>

          <dl className="relative mt-10 space-y-6 text-sm">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiMail className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  E-mail principal
                </dt>
                <dd className="text-base font-semibold text-white">
                  fiapnews@fiap.com
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiPhone className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Atendimento comercial
                </dt>
                <dd className="text-base font-semibold text-white">
                  (11) 3000-4000
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-black/20">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <FiClock className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Horário de resposta
                </dt>
                <dd className="text-base font-semibold text-white">
                  Até 1 dia útil
                </dd>
              </div>
            </div>
          </dl>

          <p className="relative mt-10 text-sm text-gray-400">
            Prefere falar com a equipe responsável por uma editoria específica?
            Indique no campo de mensagem e direcionaremos seu contato.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="h-full rounded-3xl border border-gray-200/80 bg-white/95 p-10 shadow-2xl shadow-gray-900/10 backdrop-blur"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Como devemos te chamar?"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mensagem"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600"
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
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-[#1C3546] focus:outline-none focus:ring-4 focus:ring-[#1C3546]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Conte o que está acontecendo ou como podemos ajudar."
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              Respondemos mensagens enviadas pelo formulário ou pelo e-mail
              acima dentro do próximo dia útil.
            </p>

            <button
              type="submit"
              disabled={enviando}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#1C3546] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition duration-200 hover:bg-[#30576b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C3546] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
