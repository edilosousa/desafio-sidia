from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import movies
from app.services.movie_service import init_movies
import os

app = FastAPI(title="API Movie")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    path = os.path.join(os.path.dirname(__file__), "..", "data", "movies.csv")
    init_movies(path)

app.include_router(movies.router)
