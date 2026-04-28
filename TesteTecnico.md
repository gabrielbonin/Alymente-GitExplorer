# Teste Técnico — React Native

## Objetivo

- Estruturar um app Expo com TypeScript.
- Criar um Design System mínimo, tipado e consistente.
- Integrar com a API pública do GitHub.
- Implementar cache simples usando uma biblioteca de preferência (ex: React Query), com boa experiência de usuário.

---

## Requisitos Técnicos

- Expo
- TypeScript
- Biblioteca de cache/data fetching (ex.: React Query/TanStack Query, SWR, RTK Query, axios-cache-interceptor)
- Testes (Jest, React Native Testing Library)
- ESLint/Prettier

---

## Funcionalidades

### 1. Telas obrigatórias

#### a. Busca de Repositórios
- Campo de busca (ex.: "react native", "typescript").
- Lista paginada/infinite scroll com: nome, owner, estrelas, linguagem, descrição.
- Pull-to-refresh.

#### b. Detalhes do Repositório
- Nome completo, owner (avatar + nome), description, stars, forks, watchers, linguagem principal.
- Ação para abrir Issues do repositório.

#### c. Issues do Repositório
- Lista paginada com título, labels, autor e data relativa.
- Pull-to-refresh.

#### d. Showcase do Design System
- Tela dedicada exibindo todos os componentes do DS em diferentes estados (variações, tamanhos, desabilitado, loading, etc).
- Opcional: switch de tema (light/dark).

---

### 2. Integração com API do GitHub

| Recurso | Endpoint |
|---|---|
| Buscar repositórios | `GET https://api.github.com/search/repositories?q={query}&sort=stars&order=desc&page={n}&per_page=20` |
| Detalhes do repositório | `GET https://api.github.com/repos/{owner}/{repo}` |
| Issues do repositório | `GET https://api.github.com/repos/{owner}/{repo}/issues?state=open&page={n}&per_page=20` |

**Observações:**
- Sem autenticação: 60 req/hora (rate limit). Opcionalmente aceite um `.env` com `GITHUB_TOKEN` para aumentar limites. Não commitar credenciais.
- Trate mensagens de erro de forma amigável (ex.: rate limit excedido, sem resultados).

---

### 3. Design System (requisitos mínimos)

#### Tokens (chaves padronizadas e tipadas)

| Token | Chaves | Valores sugeridos |
|---|---|---|
| `spacing` | `xs, sm, md, lg, xl` | 4, 8, 16, 24, 32 |
| `sizes` | `xs, sm, md, lg, xl` | (ex.: tipografia) |
| `colors` | `primary, background, surface, text, muted, border, success, warning, danger` | — |
| `radius` | `sm, md, lg` | — |

#### Padrões
- Use as chaves `xs, sm, md, lg, xl` como padrão consistente para espaçamento, tamanhos e tipografia.

#### Tema
- Preferir `ThemeProvider` e hook (ex.: `useTheme`).
- Tema dark é recomendado (não obrigatório).

#### Componentes base (tipados)

| Componente | Detalhes |
|---|---|
| `Text` / `Heading` | `variant` e `size` baseados nos tokens |
| `Button` | variants: `primary`, `outline`, `ghost`; sizes: `sm`, `md`, `lg`; estados: `loading`, `disabled` |
| `Input` | `label`, `value`, `error`, `helperText` |
| `Card` / `Surface` | — |
| `Badge` / `Tag` | — |
| `Avatar` | — |

#### Restrições importantes
- Evitar uso de componentes não tipados na construção de telas.
- Evitar dar liberdade de personalização por instância (ex.: `style` "solto" para modificar `Button` individualmente).
- Preferir props controladas (`variant`, `size`, `tone`) em vez de estilos livres.

---

### 4. Cache
- Pode usar React Query/TanStack Query, SWR, RTK Query, axios-cache-interceptor, ou outra de sua preferência.

---

### 5. Organização do projeto
- De sua escolha. Preferimos uma organização clara (ex.: Clean Architecture, por features, ou por camadas).

---

## Entrega

- [ ] Criar um repositório público no GitHub.
- [ ] App Expo + TypeScript funcional.
- [ ] App Expo inicia sem erros.
- [ ] Busca de repositórios funciona com paginação.
- [ ] Ao tocar, abre detalhes do repositório.
- [ ] Design System mínimo tipado (tokens + componentes base).
- [ ] Tela de Showcase do Design System exibindo todos os componentes com suas variações.
- [ ] Integração com API do GitHub.
- [ ] Cache simples controlado via biblioteca de sua preferência.
- [ ] Commits pequenos e descritivos.
- [ ] README contendo:
  - Instruções de instalação e execução.
  - Explicação breve das decisões arquiteturais.
