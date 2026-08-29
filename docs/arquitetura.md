# 🏗 Arquitetura Técnica — GameFinder

## Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Expo | ~54.0.0 |
| Runtime | React Native | 0.81.1 |
| Linguagem | TypeScript | ~5.7.0 |
| Roteamento | Expo Router | ~4.0.x |
| Estado | Zustand | ^5.0.0 |
| UI extras | expo-blur, expo-linear-gradient | ~14.x |
| Ícones | @expo/vector-icons (Ionicons) | ^14.x |

---

## Decisões de Arquitetura

### Por que Expo SDK 54?
- Suporte nativo a iOS físico via **Expo Go** (sem necessidade de build customizado no CP4/CP5)
- Última versão com suporte à **Legacy Architecture** (estabilidade para o projeto acadêmico)
- `newArchEnabled: false` garante compatibilidade com todas as dependências

### Por que Expo Router v4 (file-based routing)?
- Roteamento declarativo baseado em sistema de arquivos (similar ao Next.js)
- Suporte nativo a **Dynamic Routes** (`[id].tsx`) — essencial para detalhes de jogos e sessões
- **Typed Routes** habilitados (`experiments.typedRoutes: true`) — TypeScript no roteamento
- Grupos de layout `(auth)` e `(tabs)` para separação clara de contextos de navegação

**Alternativa descartada:** React Navigation — mais verboso, sem file-based routing, exige mais boilerplate para nested navigators.

### Por que Zustand?
- Zero boilerplate (sem actions, reducers, dispatchers)
- API simples: `create()` → store pronto para uso
- Fácil migração para **React Query + Zustand** no CP6 (API real)
- Bundle size pequeno (~2KB minzipped)

**Alternativa descartada:** Redux Toolkit — overhead desnecessário para este escopo, curva de aprendizado mais alta.

### Por que TypeScript (strict)?
- `compilerOptions.strict: true` força type safety desde o início
- Path aliases (`@/*`, `@store/*`, etc.) mantêm imports limpos
- Interfaces definidas em `src/types/` servem como documentação viva do modelo de dados

---

## Estrutura de Navegação

```
app/
├── _layout.tsx          # Root: StatusBar, fonts, SplashScreen
├── (auth)/              # Stack sem tab bar
│   ├── index.tsx        # Login
│   └── signup.tsx       # Cadastro
├── (tabs)/              # Tab navigator (BlurView)
│   ├── index.tsx        # Home (descoberta)
│   ├── explore.tsx      # Explorar + busca + filtros
│   ├── map.tsx          # Mapa de sessões abertas
│   └── profile.tsx      # Perfil do usuário
├── catalog.tsx          # Catálogo completo (fora das tabs)
├── details/[id].tsx     # Detalhe de jogo (dynamic route)
├── party/[id].tsx       # Detalhe de sessão/mesa
├── notifications.tsx    # Central de notificações
└── +not-found.tsx       # 404
```

---

## Fluxo de Dados

```
src/data/*.json
    ↓ importado em
src/store/use*Store.ts  (Zustand)
    ↓ consumido por
app/**/*.tsx  (telas)
    ↓ renderiza
src/components/**  (componentes reutilizáveis)
    ↓ usa tokens de
src/constants/  (Colors, Typography, Spacing)
```

---

## Estratégia de Evolução (CP5 → CP6)

| CP4 (atual) | CP5 | CP6 |
|------------|-----|-----|
| JSON local mockado | json-server / mock API | API REST real |
| Zustand com dados estáticos | Zustand + loading states | React Query + Zustand |
| Navegação estruturada | Telas completas funcionais | Build EAS + APK |
| Componentes placeholder | Componentes completos | Integração BoardGameGeek API |

---

## Configuração de Qualidade

### Prettier
Arquivo `.prettierrc` configurado para consistência entre todos os desenvolvedores:
- `singleQuote: true`, `tabWidth: 2`, `trailingComma: 'es5'`

### Path Aliases (tsconfig.json)
```typescript
// Em vez de:
import { Colors } from '../../../src/constants/Colors';

// Usar:
import { Colors } from '@constants/Colors';
```

### Tipos TypeScript
- `src/types/Game.ts` — Interface completa do board game
- `src/types/Group.ts` — Interface de sessão/mesa
- `src/types/User.ts` — Interface do perfil do usuário
