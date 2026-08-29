/**
 * GameFinder Design System — Typography
 * Baseado na identidade visual do Figma
 */
export const Typography = {
  /** Pesos de fonte */
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },

  /** Tamanhos padronizados */
  size: {
    /** Labels em caps com letterSpacing (eyebrow) */
    eyebrow: 10,
    xs: 9,
    sm: 11,
    md: 13,
    body: 16,
    lg: 20,
    xl: 25,
    xxl: 28,
    display: 35,
  },

  /** Letter spacing padrão */
  spacing: {
    eyebrow: 1.4,
    caps: 1.0,
    wide: 0.6,
    normal: 0,
  },

  /** Line heights */
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;
