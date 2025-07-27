from typing import Any, Dict
from app.models.movie import Movie
from app.core.csv_loader import load_movies_csv

MOVIE_CACHE: list[Movie] = []

def init_movies(path: str):
    global MOVIE_CACHE
    MOVIE_CACHE = load_movies_csv(path)

def get_movies_paginated(limit: int = 10, offset: int = 0) -> Dict[str, Any]:
    total = len(MOVIE_CACHE)
    items = MOVIE_CACHE[offset : offset + limit]
    return {"items": items, "total": total}

def get_movie_by_id(movie_id: str) -> Movie | None:
    return next((movie for movie in MOVIE_CACHE if movie.id == movie_id), None)

def get_most_popular_movies(limit: int = 10) -> list[Movie]:
    qualified_movies = [
        m for m in MOVIE_CACHE
        if not m.adult and (m.vote_count or 0) > 200 and (m.vote_average or 0) > 6
    ]
    sorted_movies = sorted(qualified_movies, key=lambda m: m.vote_count or 0, reverse=True)
    return sorted_movies[:limit]

