import type { Movie } from "./Movie";

export interface MovieListResponse extends Movie{
  items: Movie[];
  total: number;
}
