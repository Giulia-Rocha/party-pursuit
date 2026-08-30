# ðŸ‘¥ Membros do Time â€” Party Pursuit

## ComposiÃ§Ã£o do Grupo

| Membro | Papel | Responsabilidades |
|--------|-------|-------------------|
| **Giulia Rocha** | Desenvolvedora Back-end | Stores Zustand, tipos TypeScript, dados mockados, setup do projeto, navegaÃ§Ã£o Expo Router |
| **Gabriel Danius** | Product Owner | Backlog, priorizaÃ§Ã£o de features, documentaÃ§Ã£o de escopo, modelo de negÃ³cio, comunicaÃ§Ã£o com o professor |
| **Carlos Eduardo** | Desenvolvedor Front-end | Componentes de UI, telas, integraÃ§Ã£o do design system, fidelidade ao Figma |
| **Caio Rossini** | UI/UX Design | Figma, identidade visual, paleta de cores, tipografia, protÃ³tipo de telas, assets |

---

## Responsabilidades por Checkpoint

### CP4 â€” IdealizaÃ§Ã£o

| Tarefa | ResponsÃ¡vel |
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

### CP5 â€” ProtÃ³tipo Funcional *(planejado)*

| Tarefa | ResponsÃ¡vel |
|--------|-------------|
| Telas completas com dados reais do mock | Carlos Eduardo |
| LÃ³gica de navegaÃ§Ã£o e fluxos | Giulia Rocha |
| Testes Jest bÃ¡sicos | Giulia Rocha |
| Roteiro de testes manuais | Gabriel Danius |
| SimulaÃ§Ã£o no Android Studio/Expo Go | Todos |

### CP6 â€” Entrega Final *(planejado)*

| Tarefa | ResponsÃ¡vel |
|--------|-------------|
| IntegraÃ§Ã£o com API (BoardGameGeek ou prÃ³pria) | Giulia Rocha |
| Build via EAS Build | Giulia Rocha |
| APK final | Giulia Rocha |
| DocumentaÃ§Ã£o final | Gabriel Danius |
| QA e testes | Carlos Eduardo + Caio Rossini |

---

## EstratÃ©gia de Branches

```
main           â† protegida (apenas merge via PR aprovado)
â””â”€â”€ develop    â† branch de integraÃ§Ã£o principal
    â”œâ”€â”€ feat/design-system      â†’ Carlos Eduardo
    â”œâ”€â”€ feat/navigation-setup   â†’ Giulia Rocha
    â”œâ”€â”€ feat/stores-mock-data   â†’ Giulia Rocha
    â””â”€â”€ docs/readme-escopo      â†’ Gabriel Danius
```

### Regras
- **Nenhum commit direto na `main`**
- PRs obrigatÃ³rios para merge em `develop`
- Merge de `develop` â†’ `main` ao final de cada Checkpoint
- Mensagens de commit em portuguÃªs seguindo o padrÃ£o: `feat:`, `fix:`, `docs:`, `style:`
