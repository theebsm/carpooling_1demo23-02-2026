from decimal import Decimal
from database import SessionLocal, Base, engine
from models import Booking, RideInformation, User

# Ensure tables exist
Base.metadata.create_all(bind=engine)
print("Tables ensured!")

session = SessionLocal()

try:
    ride_id = 1
    user_id = 1
    seats_requested = 2

    # 1️⃣ Check if ride exists
    ride = session.query(RideInformation).filter_by(id=ride_id).first()
    if not ride:
        raise Exception("Ride not found")

    # 2️⃣ Check if user exists
    user = session.query(User).filter_by(id=user_id).first()
    if not user:
        raise Exception("User not found")

    # 3️⃣ Check seat availability
    if ride.seats_available < seats_requested:
        raise Exception("Not enough seats available")

    # 4️⃣ Calculate total price
    # (Assuming price per seat = 500 for now)
    price_per_seat = Decimal("500.00")
    total_price = price_per_seat * seats_requested

    # 5️⃣ Create booking
    new_booking = Booking(
        ride_id=ride_id,
        user_id=user_id,
        seats_booked=seats_requested,
        total_price=total_price
    )

    session.add(new_booking)

    # 6️⃣ Reduce available seats in ride
    ride.seats_available -= seats_requested

    session.commit()
    print("Booking created successfully!")

except Exception as e:
    session.rollback()
    print("ERROR:", e)

finally:
    session.close()