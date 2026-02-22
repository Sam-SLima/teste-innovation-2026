# 🚀 Teste Prático – Front-end (Innova Dinâmica)

Este projeto é uma mini-aplicação de e-commerce desenvolvida com **Next.js 14+** para listagem e gerenciamento de produtos, consumindo uma API de autenticação e catálogo. O foco principal foi performance, acessibilidade e gerenciamento de estado moderno.

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Gerenciamento de Estado:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (Global & Persistência)
* **Data Fetching:** [React Query](https://tanstack.com/query/latest) (Server State & Cache)
* **Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Ícones:** [Lucide React](https://lucide.dev/)

---

## 🎥 Demonstração do Fluxo

Abaixo você pode conferir o funcionamento da aplicação, incluindo o fluxo de login, proteção de rotas, busca com debounce e sistema de favoritos.

[https://github.com/Sam-SLima/teste-innovation-2026/raw/main/public/demo.mp4](https://www.loom.com/share/fb342257ff6d4712b8916f0e107f3a56)

---

## 📋 Funcionalidades Implementadas

### 1. Autenticação e Segurança
* **Middleware de Proteção:** Implementação de `middleware.ts` para garantir que a rota `/produtos` seja acessível apenas por usuários autenticados.
* **Fluxo de Login:** Integração com o endpoint POST de autenticação, salvando o Bearer Token com segurança.
* **Logout & Expiração:** Tratamento para limpar os dados de sessão e redirecionar ao login em caso de erro 401 ou logout manual.

### 2. Listagem de Produtos
* **Grid Responsivo:** Layout mobile-first com cards detalhados.
* **Busca com Debounce:** Sistema de filtro por nome e código que otimiza as chamadas à API, disparando a busca apenas após a pausa na digitação (300ms a 500ms).
* **Ordenação Dinâmica:** Filtros locais por preço e nome (A-Z / Z-A).
* **Formatação BRL:** Preços formatados utilizando a API `Intl.NumberFormat`.

### 3. Favoritos (Persistência Local)
* **Zustand Persist:** Os produtos favoritos são salvos no `localStorage` automaticamente através do middleware do Zustand, garantindo que os dados permaneçam após o refresh da página.
* **Filtro de Favoritos:** Opção para visualizar rapidamente apenas os itens marcados como favoritos.

### 4. UI/UX e Acessibilidade
* **Feedback Visual:** Uso de Skeletons para carregamento inicial e estados de erro amigáveis.
* **Modal de Detalhes:** Modal acessível para conferir informações detalhadas do produto sem sair da listagem.

---

## 📐 Decisões Técnicas

* **React Query:** Escolhido para gerenciar o estado do servidor, garantindo cache eficiente e evitando múltiplas requisições desnecessárias.
* **Zustand:** Utilizado pela sua simplicidade e baixo boilerplate em comparação ao Redux, ideal para o gerenciamento de favoritos e autenticação.
* **Arquitetura:** Organização de pastas seguindo os padrões do Next.js App Router, separando componentes de UI de componentes de lógica de negócio.

---

## 📦 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Sam-SLima/teste-innovation-2026.git](https://github.com/Sam-SLima/teste-innovation-2026.git)
    cd teste-innovation-2026
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    [http://localhost:3000](http://localhost:3000)

---

## 📊 Performance (Lighthouse Desktop)

A aplicação foi desenvolvida focando nos critérios do Lighthouse:
* **Performance:** 90+
* **Acessibilidade:** 90+
* **Melhores Práticas:** 90+
* **SEO:** 90+

---

## 🚧 O que ficou pendente

* **Docker:** A aplicação está configurada para execução nativa em ambiente Node.js.
* **Testes Automatizados:** Implementação de testes unitários e E2E (Vitest/Playwright).

---

**Desenvolvido por Samuel Lima** ✨
