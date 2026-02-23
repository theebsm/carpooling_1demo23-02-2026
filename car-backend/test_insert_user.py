# test_insert_user.py
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from datetime import datetime, timezone

# -------------------
# DATABASE CONFIG
# -------------------
DATABASE_URL = "postgresql://postgres:secretpassword@localhost:5432/carpooling"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# -------------------
# PASSWORD HASHING
# -------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------
# USER MODEL
# -------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    gender = Column(String)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="user")
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# -------------------
# CREATE TABLES
# -------------------
Base.metadata.create_all(bind=engine)
print("Tables ensured in PostgreSQL!")

# -------------------
# INSERT TEST USER
# -------------------
def insert_test_user():
    db = SessionLocal()
    try:
        # Change email if you run multiple times to avoid duplicate errors
        email = f"john_test{datetime.now(timezone.utc).timestamp()}@example.com"

        new_user = User(
            name="John Doe",
            phone="1234567890",
            email=email,
            gender="male",
            password_hash=pwd_context.hash("mypassword"),
            role="user",
            is_verified=True
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print(f"User inserted: ID={new_user.id}, Name={new_user.name}, Email={new_user.email}")

    except Exception as e:
        db.rollback()
        print("Error inserting user:", e)

    finally:
        db.close()

if __name__ == "__main__":
    insert_test_user()
