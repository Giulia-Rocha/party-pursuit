/**
 * GameFinder Design System — Colors
 * Extraído diretamente do Figma (identidade visual oficial do app)
 */
export const Colors = {
  // === Cores Primárias ===
  /** Ciano neon — cor de destaque principal */
  cyan: '#00F0FF',
  /** Magenta/vermelho — CTA principal, botão Primary */
  magenta: '#FF003C',
  /** Background base — dark profundo */
  ink: '#05060C',

  // === Superfícies ===
  /** Superfície para inputs e cards */
  surface: '#09101B',
  /** Superfície alternativa (mapa, fundo secundário) */
  surfaceAlt: '#07101B',
  /** Gradiente do Hero card */
  heroGradientStart: '#171B30',
  heroGradientEnd: '#0B1120',

  // === Bordas ===
  /** Borda cyan translúcida — inputs, hero, pins */
  borderCyan: 'rgba(0,240,255,0.45)',
  /** Borda branca sutil — cards, listas */
  borderWhite: 'rgba(255,255,255,0.13)',
  /** Borda branca levemente mais visível */
  borderLight: 'rgba(255,255,255,0.16)',

  // === Texto ===
  textPrimary: '#FFFFFF',
  textSecondary: '#AAB7C9',
  textMuted: '#8193A7',
  textPlaceholder: '#78909E',

  // === Status ===
  /** Vagas disponíveis — urgência */
  seats: '#FF4F72',
  /** Amarelo/dourado — ratings, XP */
  accent: '#F59E0B',
  success: '#10B981',
  error: '#EF4444',
} as const;

export type ColorKey = keyof typeof Colors;
