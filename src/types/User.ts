export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  favoriteGameIds: string[];
  joinedSessionIds: string[];
}
