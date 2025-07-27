export interface Movie {
  id: number;
  title: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  status?: string;
  revenue?: number;
  runtime?: number;
  adult?: boolean;
  backdrop_path?: string;
  genres?: string;
  original_language?: string;
  poster_path?: string;
}
