# ðŸŽ® Party Pursuit

> **Encontre sua prÃ³xima mesa.** Descubra board games e conecte-se a jogadores perto de vocÃª.

![Expo SDK](https://img.shields.io/badge/Expo-~54.0.0-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Estado-Zustand-orange)

---

## ðŸ“± Sobre o App

O **Party Pursuit** resolve um problema real da comunidade de board gamers: **Ã© difÃ­cil encontrar grupos para jogar**. O app conecta jogadores locais, exibe sessÃµes abertas perto de vocÃª e permite descobrir novos jogos de acordo com o seu perfil.

### ðŸŽ¯ Problema
Grupos de board games vivem dispersos em grupos de WhatsApp, Discord e eventos avulsos â€” sem centralizaÃ§Ã£o, sem descoberta, sem matchmaking.

### ðŸ’¡ SoluÃ§Ã£o
Uma plataforma mobile que funciona como **"Tinder para board games"**: vocÃª descobre jogos, vÃª mesas abertas no mapa e entra nas partidas com um toque.

---

## ðŸ‘¥ Time

| Membro | Papel | Responsabilidades |
|--------|-------|-------------------|
| **Giulia Rocha** | Desenvolvedora Back-end | Stores Zustand, tipos TypeScript, dados mockados, navegaÃ§Ã£o |
| **Gabriel Danius** | Product Owner | Backlog, priorizaÃ§Ã£o, documentaÃ§Ã£o de escopo e modelo de negÃ³cio |
| **Carlos Eduardo** | Desenvolvedor Front-end | Componentes de UI, telas, design system, fidelidade ao Figma |
| **Caio Rossini** | UI/UX Design | Figma, identidade visual, paleta de cores, protÃ³tipo de telas |

---

## ðŸ— Arquitetura

```
Stack: Expo SDK ~54.0.0 + Expo Router v4 (file-based) + Zustand + TypeScript
```

| DecisÃ£o | Escolha | Motivo |
|---------|---------|--------|
| **Roteamento** | Expo Router v4 (file-based) | PadrÃ£o moderno, similar ao Next.js, nativo para iOS/Android |
| **Estado global** | Zustand | Simples, sem boilerplate, fÃ¡cil de escalar para API real no CP6 |
| **Linguagem** | TypeScript (strict) | Type safety desde o CP4, previne bugs no CP5/CP6 |
| **UI** | StyleSheet nativo + design system prÃ³prio | Performance mÃ¡xima, fidelidade ao Figma |
| **Dados CP4/CP5** | JSON local mockado | ProgressÃ£o natural â†’ API real no CP6 |

### Fluxo de dados

```
src/data/*.json  â†’  src/store/use*Store.ts (Zustand)  â†’  app/**/*.tsx (telas)
                                                       â†’  src/components/** (componentes)
```

---

## ðŸš€ Como rodar localmente

### PrÃ©-requisitos
- **Node.js** 20+
- **npm** 10+
- **Expo Go** instalado no iPhone (App Store) ou simulador iOS

### InstalaÃ§Ã£o

```bash
# 1. Clone o repositÃ³rio
git clone https://github.com/[seu-usuario]/Party Pursuit.git
cd Party Pursuit

# 2. Instale as dependÃªncias
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start
```

ðŸ“± **iOS fÃ­sico:** Escaneie o QR Code com o **Expo Go** (App Store)  
ðŸ’» **Simulador:** Pressione `i` no terminal

---

## ðŸ“ Estrutura de Pastas

```
cp04-mobile/
â”œâ”€â”€ app/                    # Rotas e telas (Expo Router)
â”‚   â”œâ”€â”€ (auth)/             # Telas de Login e Signup
â”‚   â”œâ”€â”€ (tabs)/             # Tab bar: Home, Explorar, Mapa, Perfil
â”‚   â”œâ”€â”€ details/[id].tsx    # Detalhe de jogo (dynamic route)
â”‚   â”œâ”€â”€ party/[id].tsx      # Detalhe de sessÃ£o
â”‚   â”œâ”€â”€ catalog.tsx         # CatÃ¡logo completo
â”‚   â””â”€â”€ notifications.tsx   # Central de notificaÃ§Ãµes
â”‚
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/         # Componentes reutilizÃ¡veis
â”‚   â”‚   â”œâ”€â”€ game/           # GameTile, GameRow
â”‚   â”‚   â””â”€â”€ group/          # (CP5)
â”‚   â”œâ”€â”€ constants/          # Design System (Colors, Typography, Spacing)
â”‚   â”œâ”€â”€ store/              # Estado global (Zustand)
â”‚   â”œâ”€â”€ types/              # TypeScript interfaces
â”‚   â””â”€â”€ data/               # Mock data JSON
â”‚
â””â”€â”€ docs/                   # DocumentaÃ§Ã£o do projeto
```

> Veja [docs/arquitetura.md](./docs/arquitetura.md) para decisÃµes tÃ©cnicas detalhadas.

---

## ðŸŽ¨ Identidade Visual

| Token | Valor | Uso |
|-------|-------|-----|
| Cor primÃ¡ria | `#00F0FF` â€” Ciano neon | Destaques, Ã­cones ativos, bordas |
| Cor de aÃ§Ã£o | `#FF003C` â€” Magenta | BotÃ£o CTA principal, notificaÃ§Ãµes |
| Background | `#05060C` â€” Ink | Fundo base de todas as telas |
| Tema | Dark cyberpunk / terminal hacker | â€” |

> ðŸŽ¨ Design no Figma: _[link a adicionar pelo time]_

---

## ðŸ“‹ Checkpoints

- [x] **CP4** â€” IdealizaÃ§Ã£o: conceito, marca, documentaÃ§Ã£o, estrutura tÃ©cnica completa
- [ ] **CP5** â€” ProtÃ³tipo funcional: telas completas, navegaÃ§Ã£o, testes com Jest
- [ ] **CP6** â€” App final: integraÃ§Ã£o com API real + APK instalÃ¡vel

---

## ðŸ“„ DocumentaÃ§Ã£o

| Documento | DescriÃ§Ã£o |
|-----------|-----------|
| [docs/escopo.md](./docs/escopo.md) | Problema, pÃºblico-alvo e proposta de valor |
| [docs/modelo-negocio.md](./docs/modelo-negocio.md) | Pitch e modelo de negÃ³cio |
| [docs/arquitetura.md](./docs/arquitetura.md) | DecisÃµes tÃ©cnicas e arquitetura |
| [docs/membros.md](./docs/membros.md) | PapÃ©is e responsabilidades do time |

---

## ðŸ“œ LicenÃ§a

Projeto acadÃªmico â€” FIAP, Engenharia de Software, 3Âº Ano  
Disciplina: Mobile Development & IoT â€” Prof. Hercules Ramos

**#KeepCoding #ReactNative #FIAP**
