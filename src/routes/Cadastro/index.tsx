import { type FormEvent, useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

        <label htmlFor="nomeUser">Nome de usuário</label>
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

        <label htmlFor="avatar">Avatar</label>
        <input
          id="avatar"
          name="avatar"
          type="url"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );

}