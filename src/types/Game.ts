export type GameGenre =
  | 'Cooperativo'
  | 'Estratégia'
  | 'Deckbuilding'
  | 'Aventura'
  | 'Temático'
  | 'Familiar'
  | 'Abstracto'
  | 'RPG';

export type GameTag = 'EM ALTA' | 'NOVO' | 'RECOMENDADO';

export interface Game {
  id: string;
  title: string;
  subtitle?: string;
  genre: GameGenre[];
  minPlayers: number;
  maxPlayers: number;
  minMinutes: number;
  maxMinutes: number;
  minAge: number;
  rating: number;
  releaseYear: number;
  description: string;
  mechanics: string[];
  coverUrl: string;
  tag?: GameTag;
}
