/**
 * Party Pursuit Design System â€” Colors
 * ExtraÃ­do diretamente do Figma (identidade visual oficial do app)
 */
export const Colors = {
  // === Cores PrimÃ¡rias ===
  /** Ciano neon â€” cor de destaque principal */
  cyan: '#00F0FF',
  /** Magenta/vermelho â€” CTA principal, botÃ£o Primary */
  magenta: '#FF003C',
  /** Background base â€” dark profundo */
  ink: '#05060C',

  // === SuperfÃ­cies ===
  /** SuperfÃ­cie para inputs e cards */
  surface: '#09101B',
  /** SuperfÃ­cie alternativa (mapa, fundo secundÃ¡rio) */
  surfaceAlt: '#07101B',
  /** Gradiente do Hero card */
  heroGradientStart: '#171B30',
  heroGradientEnd: '#0B1120',

  // === Bordas ===
  /** Borda cyan translÃºcida â€” inputs, hero, pins */
  borderCyan: 'rgba(0,240,255,0.45)',
  /** Borda branca sutil â€” cards, listas */
  borderWhite: 'rgba(255,255,255,0.13)',
  /** Borda branca levemente mais visÃ­vel */
  borderLight: 'rgba(255,255,255,0.16)',

  // === Texto ===
  textPrimary: '#FFFFFF',
  textSecondary: '#AAB7C9',
  textMuted: '#8193A7',
  textPlaceholder: '#78909E',

  // === Status ===
  /** Vagas disponÃ­veis â€” urgÃªncia */
  seats: '#FF4F72',
  /** Amarelo/dourado â€” ratings, XP */
  accent: '#F59E0B',
  success: '#10B981',
  error: '#EF4444',
} as const;

export type ColorKey = keyof typeof Colors;
