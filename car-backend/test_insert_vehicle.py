# test_insert_vehicle.py

from datetime import datetime
from models import Vehicle  # make sure Vehicle model exists
from database import SessionLocal

session = SessionLocal()

vehicle_number = "MH12AB1234"
driver_id = 1
vehicle_type = "Car"
seats_available = 4
color = "Red"

# Check if vehicle already exists
vehicle = session.query(Vehicle).filter_by(vehicle_number=vehicle_number).first()

if vehicle:
    # Update existing vehicle
    vehicle.driver_id = driver_id
    vehicle.vehicle_type = vehicle_type
    vehicle.seats_available = seats_available
    vehicle.color = color
    print(f"Vehicle updated: {vehicle_number}")
else:
    # Insert new vehicle
    new_vehicle = Vehicle(
        driver_id=driver_id,
        vehicle_type=vehicle_type,
        vehicle_number=vehicle_number,
        seats_available=seats_available,
        color=color,
        created_at=datetime.utcnow()
    )
    session.add(new_vehicle)
    print(f"Vehicle inserted: {vehicle_number}")

session.commit()
session.close()