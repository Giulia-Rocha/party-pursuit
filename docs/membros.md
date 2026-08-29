# 👥 Membros do Time — GameFinder

## Composição do Grupo

| Membro | Papel | Responsabilidades |
|--------|-------|-------------------|
| **Giulia Rocha** | Desenvolvedora Back-end | Stores Zustand, tipos TypeScript, dados mockados, setup do projeto, navegação Expo Router |
| **Gabriel Danius** | Product Owner | Backlog, priorização de features, documentação de escopo, modelo de negócio, comunicação com o professor |
| **Carlos Eduardo** | Desenvolvedor Front-end | Componentes de UI, telas, integração do design system, fidelidade ao Figma |
| **Caio Rossini** | UI/UX Design | Figma, identidade visual, paleta de cores, tipografia, protótipo de telas, assets |

---

## Responsabilidades por Checkpoint

### CP4 — Idealização

| Tarefa | Responsável |
|--------|-------------|
| Setup inicial do projeto Expo | Giulia Rocha |
| Design System (Colors, Typography, Spacing) | Carlos Eduardo + Caio Rossini |
| Identidade visual e Figma | Caio Rossini |
| Tipos TypeScript e Stores Zustand | Giulia Rocha |
| Mock data (games.json, groups.json) | Giulia Rocha |
| Telas placeholder (Login, Home, Explore, Map, Profile) | Carlos Eduardo |
| README principal | Gabriel Danius |
| docs/escopo.md | Gabriel Danius |
| docs/modelo-negocio.md | Gabriel Danius |
| docs/arquitetura.md | Giulia Rocha |

### CP5 — Protótipo Funcional *(planejado)*

| Tarefa | Responsável |
|--------|-------------|
| Telas completas com dados reais do mock | Carlos Eduardo |
| Lógica de navegação e fluxos | Giulia Rocha |
| Testes Jest básicos | Giulia Rocha |
| Roteiro de testes manuais | Gabriel Danius |
| Simulação no Android Studio/Expo Go | Todos |

### CP6 — Entrega Final *(planejado)*

| Tarefa | Responsável |
|--------|-------------|
| Integração com API (BoardGameGeek ou própria) | Giulia Rocha |
| Build via EAS Build | Giulia Rocha |
| APK final | Giulia Rocha |
| Documentação final | Gabriel Danius |
| QA e testes | Carlos Eduardo + Caio Rossini |

---

## Estratégia de Branches

```
main           ← protegida (apenas merge via PR aprovado)
└── develop    ← branch de integração principal
    ├── feat/design-system      → Carlos Eduardo
    ├── feat/navigation-setup   → Giulia Rocha
    ├── feat/stores-mock-data   → Giulia Rocha
    └── docs/readme-escopo      → Gabriel Danius
```

### Regras
- **Nenhum commit direto na `main`**
- PRs obrigatórios para merge em `develop`
- Merge de `develop` → `main` ao final de cada Checkpoint
- Mensagens de commit em português seguindo o padrão: `feat:`, `fix:`, `docs:`, `style:`
