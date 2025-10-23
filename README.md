# 📋 FEATURES LIST

## Todas as TAREFAS/FEATURES devem ser finalizadas.
### Prestar atenção ao <span style="color:red">DEADLINE</span> das FEATURES.

---

## 🧩 RESPONSABILIDADES

- **Mentoria:** Prof. Alexandre  
- **TechLead:** Anna  
- **Homolog:** Duarte  

---

## 🧭 FLUXO DE HOMOLOGAÇÃO

1. **Criação da Feature:**  
   Cada grupo cria uma branch seguindo o padrão `feature/nome-da-feature`.  
   Exemplo: `feature/form-login`.

2. **Desenvolvimento e Teste Inicial (Grupo Responsável):**  
   Cada grupo é responsável por:
   - Desenvolver a feature até o final.
   - Testar localmente e corrigir erros antes do merge.

3. **Merge para `develop`:**  
   Após testes bem-sucedidos, o grupo realiza o *finish*, fazendo merge para `develop`.  

4. **Testes Gerais (Grupo 7):**  
   O grupo de testes faz o *double check*:
   - Verifica bugs, responsividade e aderência ao escopo.
   - Corrige eventuais erros encontrados.

5. **Homologação (Duarte):**  
   Quando o grupo de testes valida a feature, Duarte realiza a homologação.  
   - Features aprovadas entram em **Release**.
   - Após estabilidade geral, a release é promovida para a `main`.

---

## ✅ IMPLEMENTADOS

| Status | Feature | Responsáveis |
|:-------|:---------|:--------------|
| ✅ | Realizar a lista de tarefas no README.md | Prof. Alexandre |
| ✅ | Criar o projeto (VITE+REACT+TS) do zero | Camilo, Carlos, Laura |
| ✅ | Limpar o boiler-plate e instalar pacotes: react-router-dom, tailwindcss, json-server, react-icons, react-use-form | Maicon, GustavoC, Gregory |
| ✅ | Criar estrutura de rotas e registrar estas (ROTAS: Home, Login, Cadastro) | Barranha, Iago, João |
| ✅ | Criar página `/sobre`, sem estilização | Grupo 5 (Maicon, GustavoC, Gregory) | 
| ✅ | Criar botão “ver mais” + verificação de cadastro | Grupo 3 (Camilo, Carlos, Laura)|
| ✅ | Criar formulário de login (usuário e senha), validar com react-use-form e autenticar cr (`/usuarios`), redirecionar p/ `/home` | Grupo 2 (Barranha, Iago, João) | 
| ✅ | Criar página `/contato` com formulário (nome, email, mensagem e botão enviar), sem estilização | Grupo 5 | 
| ✅ | Estilizar página de login | Grupo 2 | 
| ✅ | Criar formulário de cadastro (nome, nom senha, avatar), enviar via POST para `/usuarios` e redirecionar p/ login | Grupo 1 | 
| ✅ | Estilizar página `/contato` | Grupo 6 | 
| ✅ | Estilizar página de notícia | Grupo 4 | 
| ✅ | Modificar estrutura de rotas: criar pasta `routes/AppRoutes`, mover páginas para `pages/` | Grupo 3 | 

---

## 🚧 EM HOMOLOGAÇÃO

| Status | Feature | Grupo / Responsáveis | Observação |
|:-------|:---------|:----------------------|:------------|
| 🚧 | Criar página de detalhes da notícia | Grupo 3 (Camilo, Carlos, Laura) | Tratar exceção de notícia inexistente, abrir link em outra página e mudar a tag <a> |
| 🚧 | Estilizar página de cadastro | Grupo 1 (Pedro Oliveira, Guilherme, Icaro) | Em homologação |
| 🚧 | Adicionar botão “Salvar notícia” na página de detalhes | Grupo 2 (Barranha, Iago, João) | Implementando lógicas | 
| 🚧 | Estilizar botão salvar + layout da página de detalhes | Grupo 4 (Miguel, Pedro, Evelyn) | Em homologação | 
| 🚧 | Estilizar página de sobre | Grupo 5 (Maicon, GustavoC, Gregory) | G7 precisa arrumar o commit certo


---

## 🧪 EM DESENVOLVIMENTO

| Status | Feature | Grupo / Responsáveis | Observação |
|:-------|:---------|:----------------------|:------------|
| 🧩 | Página Sobre | Grupo 7 (Tiago, Facchin, Gustavo) | 🔴 Corrigindo estilização da página Sobre |

---

## 🧍‍♂️ STATUS DOS GRUPOS

| Grupo | Integrantes | Status Atual | Disponibilidade |
|:------|:-------------|:--------------|:----------------|
| **1** | Pedro Oliveira, Guilherme, Icaro | Criar Logo | 🔴 DEADLINE |
| **2** | Barranha, Iago, João | Criação do botão | ✅ Disponivel |
| **3** | Camilo, Carlos, Laura | Criação página de detalhes | 🔴 DEADLINE |
| **4** | Miguel, Evelyn, Pedro Crus | Estilização botão salvar| ✅ Disponivel |
| **5** | Maicon, GustavoC, Gregory | Estilização sobre | ✅ Disponivel |
| **6** | Leonardo, Richard, Charles | Criação card dos integrantes   | 🔴 DEADLINE |
| **7** | Tiago, Facchin, Gustavo | Testes e validações gerais | 🚧 Em desenvolvimento |

---

## 🐞 CONTROLE DE BUGS E HOMOLOGAÇÕES *(EXEMPLO)*

| ID | Feature | Grupo | Status | Responsável pelo Bugfix | Observação |
|----|----------|--------|---------|--------------------------|-------------|
| #001 | Página /sobre | Grupo 5 | 🔍 Em análise | - | Aguardando validação visual |
| #002 | Login | Grupo 2 | ✅ Corrigido | Barranha | Validação e redirecionamento ajustados |
| #003 | Cadastro | Grupo 1 | 🚧 Corrigindo | Icaro | Endpoint não retorna status correto |
| #004 | Estrutura de rotas | Grupo 3 | ⏳ Testando | Camilo | Dependente de revisão final |

---

## ⏰ DEADLINES
| Feature | Grupo | Prazo Final | Status |
|----------|--------|-----------------|---------|
| Criação card dos integrantes | Grupo 6 (Leonardo, Richard, Charles) | 🔴 <span style="color:red">DEADLINE 20:00</span> | Ajustando git
| Criar logo | Grupo 1 (Pedro Oliveira, Guilherme, Icaro) | 🔴 <span style="color:red">DEADLINE 20:00</span> | Finalizando
| Criação página de detalhes | Grupo 3 (Camilo, Carlos, Laura) | 🔴 <span style="color:red">DEADLINE 20:00</span> |  Finalizando


---

## 🧱 PADRÕES DE NOMENCLATURA

- **Branches de feature:** `feature/nome-da-feature`
- **Branches de bugfix:** `bugfix/nome-do-bug`
- **Branches de release:** `release/vx.x.x`
- **Commits:** usar o padrão `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, etc.

---

## 💬 OBSERVAÇÕES FINAIS

> Este documento serve como **controle central** do andamento do projeto, organizando:
> - O progresso das features  
> - O status dos grupos  
> - As homologações e deadlines  
> - A rastreabilidade de bugs e correções  

🛑 **Atenção:**  
Somente **Alexandre (Mentor)**, **Anna (TechLead)** e **Duarte (Homologador)** têm permissão para atualizar o conteúdo deste README.  
Qualquer solicitação de alteração deve ser encaminhada a um dos dois, garantindo consistência e controle nas informações oficiais do projeto.

---

🗂️ LEGENDA DE EMOJIS
| Emoji | Significado               | Uso no README                                                  |
| :---: | ------------------------- | -------------------------------------------------------------- |
|   ✅   | **Implementado**          | Feature finalizada, testada e integrada à develop              |
|   🚧  | **Em Homologação**        | Feature pronta, aguardando validação pelo grupo de homologação |
|   🧪  | **Em Desenvolvimento**    | Feature em andamento pelos grupos de desenvolvimento           |
|   🐛  | **Bug Encontrado**        | Indica problema reportado em alguma feature                    |
|   🔧  | **Correção em Andamento** | Bug em correção por parte dos responsáveis                     |
|   🕐  | **Pendente**              | Tarefa aguardando início                                       |
|   🧩  | **Dependência**           | Requer outra feature antes de continuar                        |
|   📦  | **Release**               | Versão estável do sistema pronta para merge na `main`          |
|   🚀  | **Deploy**                | Aplicação publicada em produção                                |
| 🧑‍💻 | **Responsáveis**          | Mostra os integrantes do grupo responsáveis pela feature       |
|   ⏰   | **Deadline**              | Prazo de entrega definido pelo professor ou homologadores      |
|   📝  | **Observação**            | Comentário adicional sobre o status de uma tarefa              |
|   🔒  | **Restrito**              | Somente Anna e Gabriel podem alterar esta seção                |
