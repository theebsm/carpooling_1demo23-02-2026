from fastapi import FastAPI
from database import Base, engine
from models.user import User

app = FastAPI()

# Create all tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Backend working successfully 🚀"}


