# ðŸ— Arquitetura TÃ©cnica â€” Party Pursuit

## Stack TecnolÃ³gico

| Camada | Tecnologia | VersÃ£o |
|--------|-----------|--------|
| Framework | Expo | ~54.0.0 |
| Runtime | React Native | 0.81.1 |
| Linguagem | TypeScript | ~5.7.0 |
| Roteamento | Expo Router | ~4.0.x |
| Estado | Zustand | ^5.0.0 |
| UI extras | expo-blur, expo-linear-gradient | ~14.x |
| Ãcones | @expo/vector-icons (Ionicons) | ^14.x |

---

## DecisÃµes de Arquitetura

### Por que Expo SDK 54?
- Suporte nativo a iOS fÃ­sico via **Expo Go** (sem necessidade de build customizado no CP4/CP5)
- Ãšltima versÃ£o com suporte Ã  **Legacy Architecture** (estabilidade para o projeto acadÃªmico)
- `newArchEnabled: false` garante compatibilidade com todas as dependÃªncias

### Por que Expo Router v4 (file-based routing)?
- Roteamento declarativo baseado em sistema de arquivos (similar ao Next.js)
- Suporte nativo a **Dynamic Routes** (`[id].tsx`) â€” essencial para detalhes de jogos e sessÃµes
- **Typed Routes** habilitados (`experiments.typedRoutes: true`) â€” TypeScript no roteamento
- Grupos de layout `(auth)` e `(tabs)` para separaÃ§Ã£o clara de contextos de navegaÃ§Ã£o

**Alternativa descartada:** React Navigation â€” mais verboso, sem file-based routing, exige mais boilerplate para nested navigators.

### Por que Zustand?
- Zero boilerplate (sem actions, reducers, dispatchers)
- API simples: `create()` â†’ store pronto para uso
- FÃ¡cil migraÃ§Ã£o para **React Query + Zustand** no CP6 (API real)
- Bundle size pequeno (~2KB minzipped)

**Alternativa descartada:** Redux Toolkit â€” overhead desnecessÃ¡rio para este escopo, curva de aprendizado mais alta.

### Por que TypeScript (strict)?
- `compilerOptions.strict: true` forÃ§a type safety desde o inÃ­cio
- Path aliases (`@/*`, `@store/*`, etc.) mantÃªm imports limpos
- Interfaces definidas em `src/types/` servem como documentaÃ§Ã£o viva do modelo de dados

---

## Estrutura de NavegaÃ§Ã£o

```
app/
â”œâ”€â”€ _layout.tsx          # Root: StatusBar, fonts, SplashScreen
â”œâ”€â”€ (auth)/              # Stack sem tab bar
â”‚   â”œâ”€â”€ index.tsx        # Login
â”‚   â””â”€â”€ signup.tsx       # Cadastro
â”œâ”€â”€ (tabs)/              # Tab navigator (BlurView)
â”‚   â”œâ”€â”€ index.tsx        # Home (descoberta)
â”‚   â”œâ”€â”€ explore.tsx      # Explorar + busca + filtros
â”‚   â”œâ”€â”€ map.tsx          # Mapa de sessÃµes abertas
â”‚   â””â”€â”€ profile.tsx      # Perfil do usuÃ¡rio
â”œâ”€â”€ catalog.tsx          # CatÃ¡logo completo (fora das tabs)
â”œâ”€â”€ details/[id].tsx     # Detalhe de jogo (dynamic route)
â”œâ”€â”€ party/[id].tsx       # Detalhe de sessÃ£o/mesa
â”œâ”€â”€ notifications.tsx    # Central de notificaÃ§Ãµes
â””â”€â”€ +not-found.tsx       # 404
```

---

## Fluxo de Dados

```
src/data/*.json
    â†“ importado em
src/store/use*Store.ts  (Zustand)
    â†“ consumido por
app/**/*.tsx  (telas)
    â†“ renderiza
src/components/**  (componentes reutilizÃ¡veis)
    â†“ usa tokens de
src/constants/  (Colors, Typography, Spacing)
```

---

## EstratÃ©gia de EvoluÃ§Ã£o (CP5 â†’ CP6)

| CP4 (atual) | CP5 | CP6 |
|------------|-----|-----|
| JSON local mockado | json-server / mock API | API REST real |
| Zustand com dados estÃ¡ticos | Zustand + loading states | React Query + Zustand |
| NavegaÃ§Ã£o estruturada | Telas completas funcionais | Build EAS + APK |
| Componentes placeholder | Componentes completos | IntegraÃ§Ã£o BoardGameGeek API |

---

## ConfiguraÃ§Ã£o de Qualidade

### Prettier
Arquivo `.prettierrc` configurado para consistÃªncia entre todos os desenvolvedores:
- `singleQuote: true`, `tabWidth: 2`, `trailingComma: 'es5'`

### Path Aliases (tsconfig.json)
```typescript
// Em vez de:
import { Colors } from '../../../src/constants/Colors';

// Usar:
import { Colors } from '@constants/Colors';
```

### Tipos TypeScript
- `src/types/Game.ts` â€” Interface completa do board game
- `src/types/Group.ts` â€” Interface de sessÃ£o/mesa
- `src/types/User.ts` â€” Interface do perfil do usuÃ¡rio
