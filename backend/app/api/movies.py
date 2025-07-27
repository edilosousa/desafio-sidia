from fastapi import APIRouter, HTTPException, Query
from app.services.movie_service import get_movies_paginated, get_movie_by_id,get_most_popular_movies
from app.models.movie import Movie, MovieListResponse

router = APIRouter()

@router.get("/movies/recommendations", response_model=list[Movie])
def recommend_movies(limit: int = Query(10, ge=1, le=50)):
    return get_most_popular_movies(limit)

@router.get("/movies", response_model=MovieListResponse)
def list_movies(limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0)):
    result = get_movies_paginated(limit=limit, offset=offset)
    return result

@router.get("/movies/{movie_id}", response_model=Movie)
def get_movie(movie_id: int):
    movie = get_movie_by_id(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

