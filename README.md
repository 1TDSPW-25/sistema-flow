Exercício PRESENCIAL:
Objetivo: Consumir a api de usuários Github e apresentar os dados através de CARDS que irão receber eles por PROPS...

URL da api : https://api.github.com/users
 
- os dados a serem mostrados são: {id, login, avatar_url}
- o card deve ser estilizado
- As rotas devem ser criadas neste padrão com estes nomes:
-- Em routes crie: GitUsers/index.tsx
-- em main crie a rota com o nome de /git-users, replique essa rota para um novo link em Menu.tsx.
-- Crie o componente card com o nome de CardGit.
-- Crie um tipo especifico para estes dados.


# README – Guia passo a passo para (Vite + React + TypeScript)

Este material foi escrito para um projeto **Vite + React + TypeScript** funcionando em ambiente Node.js. Vamos estudar, em ordem:

1) **useState** e **useEffect** – conceito, relação entre eles, exemplos e um exercício resolvido
2) **useParams** – obtendo parâmetros da URL
3) **Props** – passando dados entre componentes
4) **useNavigate** – navegando por código
5) **useContext** – compartilhando estado global
6) **json-server** – o que é, para que serve, modo remoto e local (usaremos o **local**)
7) **fetch** – como consumir a API do json-server em GET/POST/PUT/DELETE, com explicações de **Promise**, **async** e **await**


## 1) useState + useEffect

### 1.1 O que é `useState`
- `useState` permite **armazenar valores** que mudam ao longo do tempo dentro de um componente.
- Quando atualizamos o estado, o **componente renderiza novamente** (re-render) refletindo os novos valores.

**Exemplo básico:**
```tsx
import { useState } from "react";

export default function Contador() {
  const [contador, setContador] = useState<number>(0);

  const incrementar = () => setContador(prev => prev + 1);
  const zerar = () => setContador(0);

  return (
    <section>
      <h2>Contador: {contador}</h2>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={zerar}>Zerar</button>
    </section>
  );
}
```
- `contador` é o **estado** atual.
- `setContador` é a função que **atualiza** o estado.
- Usamos a forma `setContador(prev => prev + 1)` para garantir que partimos do valor mais recente.

### 1.2 O que é `useEffect`
- `useEffect` permite **executar efeitos colaterais** após a renderização: buscar dados, configurar timers, ler/gravar no `localStorage` etc.
- A assinatura é `useEffect(() => { /* efeito */ }, [dependencias])`.
- O segundo parâmetro é um **array de dependências**. O efeito roda:
  - **Sempre** que o componente renderiza **e** qualquer dependência muda.
  - **Apenas uma vez** no carregamento, se você passar `[]` (array vazio).

**Exemplo básico:**
```tsx
import { useEffect, useState } from "react";

export default function Relogio() {
  const [agora, setAgora] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(id); // limpa o intervalo ao desmontar
  }, []); // roda só uma vez

  return <p>Hora atual: {agora.toLocaleTimeString()}</p>;
}
```

### 1.3 Como `useState` e `useEffect` se relacionam
- É comum **buscar dados** em um `useEffect` e **salvar no estado** com `useState`.
- Quando o estado muda, o componente re-renderiza e mostra os dados.

**Exemplo: buscar uma lista e salvar em estado**
```tsx
import { useEffect, useState } from "react";

type Produto = { id: number; nome: string; preco: number };

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const resp = await fetch("http://localhost:3001/produtos");
        if (!resp.ok) throw new Error("Falha ao buscar produtos");
        const dados: Produto[] = await resp.json();
        setProdutos(dados);
      } catch (e: any) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <ul>
      {produtos.map(p => (
        <li key={p.id}>{p.nome} — R$ {p.preco}</li>
      ))}
    </ul>
  );
}
```

### 1.4 Exercício resolvido (contador com título da página)
**Objetivo:** Criar um contador que atualiza o **título da aba** com o valor atual.

Passos:
1. Criar o estado `contador` com `useState(0)`.
2. Criar a função `incrementar` que soma +1.
3. No `useEffect`, atualizar `document.title` sempre que `contador` mudar.

**Solução:**
```tsx
import { useEffect, useState } from "react";

export default function ContadorComTitulo() {
  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    document.title = `Contagem: ${contador}`;
  }, [contador]);

  return (
    <div>
      <h3>Contador: {contador}</h3>
      <button onClick={() => setContador(prev => prev + 1)}>+1</button>
    </div>
  );
}
```

---

## 2) useParams (React Router)

### 2.1 O que é
- `useParams` obtém **parâmetros dinâmicos** da URL quando usamos rotas como `/produtos/:id`.
- Exemplo de rota: `/produtos/5` → `id = "5"`.

### 2.2 Configurando a rota
No arquivo onde você define suas rotas (ex.: `main.tsx`):
```tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProdutoDetalhe from "./ProdutoDetalhe";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/produtos/:id", element: <ProdutoDetalhe /> }
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
```

### 2.3 Lendo o parâmetro no componente
```tsx
import { useParams } from "react-router-dom";

type Params = { id?: string };

export default function ProdutoDetalhe() {
  const { id } = useParams<Params>();
  return <h2>Detalhes do produto ID: {id}</h2>;
}
```

---

## 3) Props (propriedades)

### 3.1 O que são
- **Props** são dados passados de um **componente pai** para um **componente filho**.
- Elas são **somente leitura** dentro do filho.

### 3.2 Exemplo simples
**Pai:**
```tsx
import ProdutoCard from "./ProdutoCard";

type Produto = { id: number; nome: string; preco: number };

export default function Lista() {
  const itens: Produto[] = [
    { id: 1, nome: "Mouse", preco: 120 },
    { id: 2, nome: "Teclado", preco: 350 }
  ];

  return (
    <div>
      {itens.map(p => (
        <ProdutoCard key={p.id} produto={p} />
      ))}
    </div>
  );
}
```

**Filho:**
```tsx
// ProdutoCard.tsx

type Produto = { id: number; nome: string; preco: number };

type Props = { produto: Produto };

export default function ProdutoCard({ produto }: Props) {
  return (
    <article>
      <h4>{produto.nome}</h4>
      <p>Preço: R$ {produto.preco}</p>
    </article>
  );
}
```

---

## 4) useNavigate (React Router)

### 4.1 O que é
- `useNavigate` permite **navegar por código** (por exemplo, ao clicar em um botão, ir para outra página).

### 4.2 Exemplo
```tsx
import { useNavigate } from "react-router-dom";

export default function BotaoDetalhes() {
  const navigate = useNavigate();

  const irParaDetalhe = (id: number) => {
    navigate(`/produtos/${id}`); // muda a URL via código
  };

  return <button onClick={() => irParaDetalhe(10)}>Ver produto 10</button>;
}
```

---

## 5) useContext

### 5.1 Quando usar
- Use `useContext` para **compartilhar estado** entre muitos componentes sem precisar passar props manualmente em cada nível (o famoso “prop drilling”).

### 5.2 Criando um contexto simples de tema
**Contexto:**
```tsx
// TemaContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Tema = "claro" | "escuro";

type TemaContextType = {
  tema: Tema;
  alternar: () => void;
};

const TemaContext = createContext<TemaContextType | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("claro");
  const alternar = () => setTema(prev => (prev === "claro" ? "escuro" : "claro"));

  return (
    <TemaContext.Provider value={{ tema, alternar }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error("useTema deve ser usado dentro de <TemaProvider>");
  return ctx;
}
```

**Uso em componentes:**
```tsx
import { useTema } from "./TemaContext";

export function Cabecalho() {
  const { tema, alternar } = useTema();
  return (
    <header>
      <p>Tema atual: {tema}</p>
      <button onClick={alternar}>Alternar tema</button>
    </header>
  );
}
```

**Envolvendo a aplicação:**
```tsx
// main.tsx
import { createRoot } from "react-dom/client";
import Root from "./Root";
import { TemaProvider } from "./TemaContext";

createRoot(document.getElementById("root")!).render(
  <TemaProvider>
    <Root />
  </TemaProvider>
);
```

---

## 6) json-server

### 6.1 O que é e para que serve
- O **json-server** cria uma **API REST** completa a partir de um arquivo JSON, sem codificar um backend.
- É excelente para **prototipagem**, **aulas** e **testes**.

### 6.2 Modos de uso
- **Remoto (my-json-server)**: usa um repositório GitHub público com um `db.json`.
  - Vantagem: sem instalação local.
  - Limitação: apenas **GET** (somente leitura).
- **Local (json-server)**: roda na sua máquina com `npm`.
  - Vantagem: **CRUD completo** (GET/POST/PUT/PATCH/DELETE).

> Nós vamos usar o **modo local**.

### 6.3 Instalação e execução (local)
1. Criar uma pasta para a API (ou usar a pasta do projeto):
   ```bash
   mkdir api-local && cd api-local
   npm init -y
   npm i -D json-server
   ```
2. Criar um arquivo `db.json` com dados iniciais:
   ```json
   {
     "produtos": [
       { "id": 1, "nome": "Mouse Gamer", "preco": 120 },
       { "id": 2, "nome": "Teclado Mecânico", "preco": 350 }
     ],
     "usuarios": [
       { "id": 1, "nome": "João", "idade": 25 },
       { "id": 2, "nome": "Maria", "idade": 30 }
     ]
   }
   ```
3. Adicionar script no `package.json`:
   ```json
   {
     "scripts": { 
       "api": "json-server --watch db.json --port 3001 --delay 300"
     }
   }
   ```
4. Rodar a API:
   ```bash
   npm run api
   ```
5. Endpoints disponíveis:
   - `GET http://localhost:3001/produtos`
   - `GET http://localhost:3001/produtos/1`
   - `POST http://localhost:3001/produtos`
   - `PUT http://localhost:3001/produtos/1`
   - `PATCH http://localhost:3001/produtos/1`
   - `DELETE http://localhost:3001/produtos/1`

### 6.4 Filtros e recursos úteis (built-in)
- Paginação: `GET /produtos?_page=1&_limit=5`
- Ordenação: `GET /produtos?_sort=preco&_order=desc`
- Filtro por campo: `GET /produtos?nome=Mouse%20Gamer`
- Busca full-text: `GET /produtos?q=gamer`

---

## 7) fetch + async/await + Promises (consumindo o json-server)

### 7.1 O que é `fetch`
- `fetch` é uma **função nativa do navegador** (e disponível no Node.js moderno) para fazer **requisições HTTP**.
- Ela retorna uma **Promise** que representa o resultado futuro da requisição.

### 7.2 O que são **Promises**
- Uma **Promise** é um objeto que representa um valor que **ainda não está disponível**, mas estará no futuro (quando a operação assíncrona terminar).
- Estados: **pending** (pendente), **fulfilled** (resolvida) ou **rejected** (rejeitada por erro).

### 7.3 O que são **async** e **await**
- `async` marca uma função como assíncrona e faz com que ela **sempre retorne uma Promise**.
- `await` **pausa** a execução **dentro** de uma função `async` até a Promise ser resolvida (ou rejeitada).
- Benefício: código mais **legível** do que encadear muitos `.then()`.

### 7.4 Por que usar `async/await` em vez de apenas Promises com `.then()`?
- Com `async/await`, o código fica **sequencial** e mais fácil de ler.
- Tratamento de erro com `try/catch` é mais **natural**.
- Menos “pirâmide de `then`” e **menos aninhamento**.

### 7.5 GET – listar produtos
```tsx
async function listarProdutos(): Promise<void> {
  try {
    const resp = await fetch("http://localhost:3001/produtos");
    if (!resp.ok) throw new Error("Falha ao buscar produtos");
    const dados = await resp.json();
    console.log("Lista:", dados);
  } catch (e) {
    console.error("Erro no GET:", e);
  }
}
```

### 7.6 POST – criar produto
```tsx
async function criarProduto() {
  try {
    const novo = { nome: "Headset", preco: 250 };
    const resp = await fetch("http://localhost:3001/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo)
    });
    if (!resp.ok) throw new Error("Falha ao criar produto");
    const criado = await resp.json();
    console.log("Criado:", criado);
  } catch (e) {
    console.error("Erro no POST:", e);
  }
}
```

### 7.7 PUT – substituir um produto inteiro
```tsx
async function substituirProduto(id: number) {
  try {
    const completo = { id, nome: "Mouse Atualizado", preco: 199 };
    const resp = await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completo)
    });
    if (!resp.ok) throw new Error("Falha ao atualizar (PUT)");
    const atualizado = await resp.json();
    console.log("Atualizado (PUT):", atualizado);
  } catch (e) {
    console.error("Erro no PUT:", e);
  }
}
```

### 7.8 PATCH – atualizar parcialmente (opcional)
```tsx
async function atualizarPreco(id: number, preco: number) {
  try {
    const resp = await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preco })
    });
    if (!resp.ok) throw new Error("Falha no PATCH");
    const atualizado = await resp.json();
    console.log("Atualizado (PATCH):", atualizado);
  } catch (e) {
    console.error("Erro no PATCH:", e);
  }
}
```

### 7.9 DELETE – remover produto
```tsx
async function removerProduto(id: number) {
  try {
    const resp = await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "DELETE"
    });
    if (!resp.ok) throw new Error("Falha ao deletar");
    console.log("Removido com sucesso");
  } catch (e) {
    console.error("Erro no DELETE:", e);
  }
}
```

### 7.10 Exemplo completo em um componente (listar e criar)
```tsx
import { useEffect, useState } from "react";

type Produto = { id: number; nome: string; preco: number };

export default function ProdutosPage() {
  const [lista, setLista] = useState<Produto[]>([]);
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [erro, setErro] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  async function carregar() {
    try {
      setCarregando(true);
      const resp = await fetch("http://localhost:3001/produtos");
      if (!resp.ok) throw new Error("Falha ao carregar");
      const dados: Produto[] = await resp.json();
      setLista(dados);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  async function criar() {
    try {
      setCarregando(true);
      const resp = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco })
      });
      if (!resp.ok) throw new Error("Falha ao criar");
      const novo: Produto = await resp.json();
      setLista(prev => [...prev, novo]);
      setNome("");
      setPreco(0);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { void carregar(); }, []);

  return (
    <main>
      <h2>Produtos</h2>
      {carregando && <p>Carregando...</p>}
      {erro && <p>Erro: {erro}</p>}

      <ul>
        {lista.map(p => (
          <li key={p.id}>{p.nome} — R$ {p.preco}</li>
        ))}
      </ul>

      <hr />

      <h3>Criar novo produto</h3>
      <label>
        Nome: <input value={nome} onChange={e => setNome(e.target.value)} />
      </label>
      <br />
      <label>
        Preço: <input type="number" value={preco} onChange={e => setPreco(Number(e.target.value))} />
      </label>
      <br />
      <button onClick={() => void criar()}>Salvar</button>
    </main>
  );
}
```

---

## Conclusão
- `useState` guarda dados do componente; `useEffect` executa efeitos (como buscar dados) e geralmente **alimenta o estado**.
- `useParams`, `useNavigate` e **Props** ajudam a **navegar e trocar dados** entre telas.
- `useContext` resolve o problema de compartilhar estado entre muitos componentes.
- `json-server` entrega uma **API REST local** muito rápida para treinar consumo de dados.
- `fetch` com **async/await** deixa o código limpo e fácil de entender.

> Próximos passos : adicionar validações de formulário, tratamento de erros mais completo e paginação com os parâmetros do `json-server`.


