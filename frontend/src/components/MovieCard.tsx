import React from "react";
import type { Movie } from "../types/Movie";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  return (
    <div className="rounded-xl shadow-md border p-4 bg-white flex flex-col gap-2">
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p className="text-sm text-gray-700">{movie.overview || "Sem descrição."}</p>
      <p className="text-sm text-gray-500">Lançamento: {movie.release_date || "N/A"}</p>
      <p className="text-sm text-gray-500">Nota: {movie.vote_average ?? "N/A"}</p>
    </div>
  );
}
