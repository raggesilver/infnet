# EventUp — Backlog

## Funcionalidades Futuras

- [ ] **Autenticação de usuários** — Login/cadastro com OAuth (Google) para controlar quem cria eventos
- [ ] **Persistência com banco de dados** — Migrar de armazenamento in-memory para D1 (SQLite da Cloudflare)
- [ ] **Página de detalhes do evento** — Rota `/eventos/:id` com informações completas e mapa
- [ ] **Edição e exclusão de eventos** — CRUD completo com confirmação de exclusão
- [ ] **Upload de imagem de capa** — Permitir imagem para cada evento usando R2 (storage da Cloudflare)
- [ ] **Filtro por categoria** — Dropdown ou chips para filtrar eventos por tipo (workshop, feira, etc.)
- [ ] **Filtro por data** — Seletor de período para mostrar apenas eventos futuros ou em intervalo específico
- [ ] **Ordenação** — Ordenar por data, nome ou data de criação
- [ ] **Paginação** — Carregar eventos de forma paginada quando a lista crescer
- [ ] **Testes automatizados** — Testes unitários com Vitest e testes E2E com Playwright
- [ ] **Validação de formulário** — Feedback inline com mensagens de erro por campo
- [ ] **Responsividade** — Otimizar layout para dispositivos móveis
- [ ] **Dark mode** — Tema escuro com toggle no header
- [ ] **PWA** — Transformar em Progressive Web App com suporte offline
- [ ] **Notificações** — Alertar usuários sobre eventos próximos via push notifications
- [ ] **Compartilhamento** — Botão para compartilhar evento via WhatsApp/redes sociais
- [ ] **Internacionalização (i18n)** — Suporte a múltiplos idiomas
- [ ] **Acessibilidade (a11y)** — Auditoria e correções com base no WCAG 2.1
