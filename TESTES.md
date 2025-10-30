# FLUXO DE TESTES E GARANTIA DE QUALIDADE (QA) - GRUPO 7

Este documento detalha o processo de testes, validação e correção de bugs sob a responsabilidade do Grupo 7. Nosso objetivo é garantir a estabilidade, funcionalidade e qualidade geral do projeto antes que as features cheguem à `main`.

---

## NOSSA EQUIPE

O Grupo 7 é o time que vai assegurar a qualidade do nosso projeto, fazendo as correções de bugs deste projeto e sendo responsáveis por realizar a verificação geral das features desenvolvidas pelos outros grupos.

- **Integrantes:**
  - Gustavo Tavares 
  - Thiago Guedes
  - Gabriel Falchin

---

## NOSSO FLUXO DE TRABALHO

Nosso trabalho começa assim que uma feature é mesclada na branch `develop`. Seguimos os seguintes passos:

1.  **Pull da `develop`:**
    - Regularmente, atualizamos nossa branch local com a versão mais recente da `develop` para obter as novas features.

2.  **Testes Gerais (Double Check):**
    - **Verificação de Funcionalidade:** Testamos a feature para garantir que ela cumpre todos os requisitos definidos no escopo.
    - **Testes de Integração:** Verificamos se a nova feature não quebrou funcionalidades existentes.
    - **Validação de API:** Conferimos se a comunicação com o `json-server` (GET, POST, etc.) está funcionando como esperado.
    - **Análise de Responsividade:** Garantimos que a interface se adapta corretamente a diferentes tamanhos de tela (desktop, tablet, mobile)

3.  **Identificação e Correção de Bugs:**
    - Se um bug for encontrado, nossa equipe é responsável por corrigi-lo diretamente.
    - Criamos uma branch `bugfix/descricao-do-bug` a partir da `develop` para isolar a correção.

4.  **Merge do Bugfix:**
    - Após corrigir e testar o bug, fazemos o merge da branch de `bugfix` de volta para a `develop`.

5.  **Sinalização para Homologação:**
    - Quando uma feature está estável e livre de bugs após nossos testes e correções, comunicamos ao **Duarte (Homolog)** que ela está pronta para a homologação final.

---

## FERRAMENTAS E DIRETRIZES

- **Branching Model:**
  - Para correções: `bugfix/nome-do-bug` (ex: `bugfix/login-nao-redireciona`).
- **Commits:**
  - Usar o padrão `fix:`.
  - Exemplo: `fix: corrige redirecionamento incorreto após login`.
- **Comunicação:**
  - Manter o **TechLead (Anna)** e o **Homologador (Duarte)** informados sobre o status dos testes e correções.

---

## CONTROLE DE BUGS

Esta seção está aqui para manter um registro claro, no qual todo bug encontrado e corrigido será documentado.

Siga o seguinte modelo:

Data | Página | Status | Responsável pelo Bugfix | Observação |
|:-------|:-----------|:--------------|:--------------|:--------------|
22/10/2025 | Cadastro | Corrigido | Gustavo Tavares | Página de cadastro permitindo dualidade no cadastro de user e email.|
22/10/2025 | Todas | Corrigido | Gabriel Fachin | Ajustando layout de todas a paginas, alterando o App.tsx.|
22/10/2025 | Sobre | Corrigido | Tiago Guedes | Pagina sobre duplicada no projeto |
23/10/2025 | Rodapé | Corrigido | Gabriel Fachin | Adicionado botão "integrantes" no rodapé sob o título "nossa equipe" |
23/10/2025 | Todas | Corrigido | Tiago Guedes | Correção no app.tsx, com a importaçao do cabecalho ao inves do menu |
23/10/2025 | Home | Corrigido | Gustavo Tavares | Validação de informações null nos cards de noticia |
23/10/2025 | Home | Corrigido | Gustavo Tavares | Correçao do nome do integrante Gustavo Tavares |
27/10/2025 | AppRoutes/Erro | Corrigido | Gabriel Fachin | Redirecionamento correto para a página de erro | 
27/10/2025 | Cabeçalho | Corrigido | Gabriel Fachin | Melhoria de responsividade no menu
27/10/2025 | Cabecalho | Corrigido | Tiago Guedes | Melhoria do Logo
27/10/2025 | Cabecalho | Corrigido | Tiago Guedes | Melhoria da identificação dos links e botões da página com houver
27/10/2025 | Cabecalho | Corrigido | Tiago Guedes | Melhoria na identificação de links em cadastro e login com houver
---
