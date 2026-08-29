export interface TableSession {
  id: string;
  gameId: string;
  gameName: string;
  gameImage: string;
  /** Nome composto: "NomeJogo · Subtítulo" */
  title: string;
  organizerName: string;
  /** Ex: "Meeple Hub, Pinheiros" */
  location: string;
  distanceKm: number;
  /** ISO 8601 date string */
  scheduledAt: string;
  totalSlots: number;
  confirmedCount: number;
  isOpen: boolean;
}
