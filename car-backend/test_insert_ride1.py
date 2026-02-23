from datetime import datetime
from database import SessionLocal, Base, engine
from models import RideInformation

# Ensure tables exist
Base.metadata.create_all(bind=engine)
print("Tables ensured!")

# Create a database session
session = SessionLocal()

# Example ride data
driver_id = 1
vehicle_id = 1  # Make sure this vehicle exists in the DB
start_location = "Mumbai"
end_location = "Pune"
ride_date = datetime(2026, 2, 20, 9, 0)
seats_available = 3

# Check if a similar ride already exists (avoid duplicates)
ride = session.query(RideInformation).filter_by(
    driver_id=driver_id,
    vehicle_id=vehicle_id,
    start_location=start_location,
    end_location=end_location,
    date=ride_date
).first()

if ride:
    # Update existing ride
    ride.seats_available = seats_available
    print(f"Ride updated for driver_id={driver_id}, vehicle_id={vehicle_id}")
else:
    # Insert new ride
    new_ride = RideInformation(
        driver_id=driver_id,
        vehicle_id=vehicle_id,
        start_location=start_location,
        end_location=end_location,
        date=ride_date,
        seats_available=seats_available
    )
    session.add(new_ride)
    print(f"New ride inserted for driver_id={driver_id}, vehicle_id={vehicle_id}")

# Commit and close session
session.commit()
session.close()