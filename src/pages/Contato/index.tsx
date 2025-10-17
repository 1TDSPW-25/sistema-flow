import { useState } from "react";
import type { FormEvent } from "react";

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
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <header className="bg-gray-800 px-10 py-12 text-center shadow-inner">
          <h1 className="font-[Bebas_Neue] text-5xl font-bold uppercase tracking-[0.35em] text-green-400">
            Contato
          </h1>
          <p className="mt-4 text-lg font-light tracking-widest text-white">
            Envie uma mensagem para nossa redação
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 px-10 py-12">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="text-sm font-semibold uppercase tracking-widest bg-gray"
            >
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={enviando}
              className="w-full rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-3 text-base text-amber-950 placeholder:text-amber-900/40 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold uppercase tracking-widest bg-gray"
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
              className="w-full rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-3 text-base text-amber-950 placeholder:text-amber-900/40 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="mensagem"
              className="text-sm font-semibold uppercase tracking-widest bg-gray"
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
              className="w-full rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-3 text-base text-amber-950 placeholder:text-amber-900/40 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Escreva sua mensagem..."
            />
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 text-sm bg-gray">
            Respondemos em até 24 horas. Se preferir, escreva para{" "}
            <span className="font-semibold bg-gray">fiapnews@fiap.com</span>.
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-amber-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
      </section>
    </main>
  );
}
