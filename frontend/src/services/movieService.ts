import axios from "axios";
import type { Movie }  from "../types/Movie";
import type { MovieListResponse } from "../types/MovieList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export async function fetchMovies(limit = 10, offset = 0): Promise<Movie[]> {
//   const response = await axios.get(`${API_BASE}/movies`, {
//     params: { limit, offset },
//   });
//   return response.data;
// }

export async function fetchMovies(limit = 10, offset = 0): Promise<MovieListResponse> {
  const response = await axios.get(`${API_BASE}/movies`, {
    params: { limit, offset },
  });
  return response.data;
}

export async function fetchMovieById(id: number): Promise<Movie> {
  const response = await axios.get(`${API_BASE}/movies/${id}`);
  return response.data;
}

export const fetchRecommendations = async (limit: number = 10) => {
  const res = await fetch(`${API_BASE}/movies/recommendations?limit=${limit}`);
  if (!res.ok) throw new Error("Erro ao buscar recomendações");
  return await res.json();
};
