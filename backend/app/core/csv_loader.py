import pandas as pd
from app.models.movie import Movie

def load_movies_csv(path: str) -> list[Movie]:
    df = pd.read_csv(path, low_memory=False)
    
    columns = [
        'id', 'title', 'overview', 'release_date', 'vote_average', 'vote_count',
        'status', 'revenue', 'runtime', 'adult', 'backdrop_path',
        'genres', 'original_language', 'poster_path'
    ]
    df = df[columns].dropna(subset=['id', 'title'])
    df = df.where(pd.notnull(df), None)

    return [Movie(**row.to_dict()) for _, row in df.iterrows()]
