import { useState, type FormEvent } from "react";

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
      alert(`Enviado!\n\nNome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`);
      setNome("");
      setEmail("");
      setMensagem("");
      setEnviando(false);
    }, 600);
  }

  return (
    <main>
      <h1>Contato</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nome">Nome:</label><br />
          <input
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={enviando}
          />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label><br />
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={enviando}
          />
        </div>

        <div>
          <label htmlFor="mensagem">Mensagem:</label><br />
          <textarea
            id="mensagem"
            name="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
            rows={6}
            cols={40}
            disabled={enviando}
          />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
