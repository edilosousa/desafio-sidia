from typing import List
from pydantic import BaseModel
from typing import Optional

class Movie(BaseModel):
    id: int
    title: str
    overview: Optional[str] = None
    release_date: Optional[str] = None
    vote_average: Optional[float] = None
    vote_count: Optional[int] = None
    status: Optional[str] = None
    revenue: Optional[int] = None
    runtime: Optional[int] = None
    adult: Optional[bool] = None
    backdrop_path: Optional[str] = None
    genres: Optional[str] = None  # Se quiser, depois pode parsear como lista
    original_language: Optional[str] = None
    poster_path: Optional[str] = None
    
class MovieListResponse(BaseModel):
    items: List[Movie]
    total: int