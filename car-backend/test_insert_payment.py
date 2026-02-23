from database import SessionLocal, Base, engine
from models import Booking, Payment  # Payment is now imported via __init__.py
from decimal import Decimal

# Ensure tables exist
Base.metadata.create_all(bind=engine)
print("Tables ensured!")

session = SessionLocal()

try:
    # Change these values as needed
    booking_id = 1
    amount = Decimal("1000.00")
    payment_method = "card"
    transaction_id = "TXN123456789"
    status = "completed"

    # Check if booking exists
    booking = session.query(Booking).filter_by(id=booking_id).first()
    if not booking:
        raise Exception("Booking not found")

    # Create new payment
    new_payment = Payment(
        booking_id=booking_id,
        amount=amount,
        payment_method=payment_method,
        transaction_id=transaction_id,
        status=status
    )

    session.add(new_payment)
    session.commit()
    print(f"Payment inserted successfully! Payment ID: {new_payment.id}")

except Exception as e:
    session.rollback()
    print("ERROR:", e)

finally:
    session.close()