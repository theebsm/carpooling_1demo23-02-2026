from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import User, Driver
from database import Base, SessionLocal
from database import Base 
 # adjust import to your models

# --- Database setup ---
engine = create_engine("postgresql://postgres:secretpassword@localhost:5432/carpooling")
Session = sessionmaker(bind=engine)
session = Session()

# --- Example user ID and driver info ---
user_id = 1
license_number = "DL123456789"
license_expiry = datetime(2029, 2, 15)
is_verified = True

# --- Check if driver already exists ---
driver = session.query(Driver).filter_by(user_id=user_id).first()

if driver:
    # Update existing driver
    driver.license_number = license_number
    driver.license_expiry = license_expiry
    driver.is_verified = is_verified
    print(f"Driver updated for user_id={user_id}")
else:
    # Insert new driver
    new_driver = Driver(
        user_id=user_id,
        license_number=license_number,
        license_expiry=license_expiry,
        is_verified=is_verified,
        created_at=datetime.utcnow()
    )
    session.add(new_driver)
    print(f"Driver inserted for user_id={user_id}")

# Commit changes
session.commit()
session.close()